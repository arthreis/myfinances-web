import React from 'react';
import * as Icons from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Header from '@/components/Header';
import Modal from '@/components/Modal';

import api from '@/services/api';
import type { Category, IconMap } from '@/schemas';
import { useTheme } from '@/hooks/theme';

import {
  Container,
  TableContainer,
  TableBodyColumn,
  Title,
  Square,
  ColorInfoContainer,
  Actions,
} from './styles';
import FormCategory from './FormCategory';
import Burguer from '@/components/Burger';
import { Button, Tooltip } from '@/components';

const ReactSwal = withReactContent(Swal);

function Config(): React.JSX.Element {
  const { theme } = useTheme();
  const [categoryEdit, setCategoryEdit] = React.useState<Category>();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isShowingModal, setIsShowingModal] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadCategories(): Promise<void> {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleOpenModal = React.useCallback((category?: Category) => {
    setCategoryEdit(category);
    setIsShowingModal(true);
  }, []);

  const handleCategoryAddedOrEdited = React.useCallback((categoryAddedOrEdited: Category) => {
    let isEdited = false;
    const newCategory = categories.map(category => {
      if (category.id === categoryAddedOrEdited.id) {
        isEdited = true;
        return categoryAddedOrEdited;
      }
      return category;
    });

    setCategories(isEdited ? newCategory : [...newCategory, categoryAddedOrEdited]);

    toast.success(
      `Categoria ${isEdited ? 'editada' : 'adicionada'} com sucesso!`,
    );

    handleCloseModal();
  },[categories, handleCloseModal],);

  const filterAndSetCategories = React.useCallback((categoryToDelete: Category) => {
    const newCategories = categories.filter(
      category => category.id !== categoryToDelete.id,
    );
    setCategories([...newCategories]);
  },[categories],);

  const handleDelete = React.useCallback(async (categoryToDelete: Category) => {
    const { data, status } = await api.delete(
      `/categories/${categoryToDelete.id}`,
    );

    if (status === 200 && data.status === 'confirm') {
      const { value: isConfirmed } = await ReactSwal.fire({
        title: 'Aviso!',
        text: data.message,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        showDenyButton: true,
        confirmButtonColor: theme.colors.success,
        denyButtonColor: theme.colors.danger,
        background: theme.colors.background,
        customClass: {
          title: 'themed-swal-text',
        },
      });

      if (isConfirmed) {
        await api.delete(
          `/categories/${categoryToDelete.id}?isConfirmed=${isConfirmed}`,
        );

        filterAndSetCategories(categoryToDelete);
        toast.success('Categoria deletada com sucesso!');
      }
    } else {
      filterAndSetCategories(categoryToDelete);
      toast.success('Categoria deletada com sucesso!');
    }
  },[theme, filterAndSetCategories],);

  return (
    <>
      <Burguer open={open} setOpen={setOpen} />
      <Header open={open} size="small" />
      <Container>
        <Title>Configurações</Title>

        <Button onClick={() => handleOpenModal()}>
          Criar categoria
        </Button>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ícone</th>
                <th>Cor Dark</th>
                <th>Cor Light</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map(category => {
                const Icon = (Icons as IconMap)[category.icon];
                return (
                  <tr key={category.id}>
                    <TableBodyColumn>{category.title}</TableBodyColumn>
                    <TableBodyColumn>
                      <Icon size={20} />
                    </TableBodyColumn>
                    <TableBodyColumn>
                      <ColorInfoContainer>
                        <Square background={category.background_color_dark} />
                        <span>{category.background_color_dark}</span>
                      </ColorInfoContainer>
                    </TableBodyColumn>
                    <TableBodyColumn>
                      <ColorInfoContainer>
                        <Square background={category.background_color_light} />
                        <span>{category.background_color_light}</span>
                      </ColorInfoContainer>
                    </TableBodyColumn>
                    <TableBodyColumn className="actions">
                      <Actions>
                        <Tooltip variant="secondary" title="Editar categoria">
                          <Icons.FiEdit
                            size={20}
                            onClick={() => handleOpenModal(category)}
                          />
                        </Tooltip>
                        <Tooltip variant="danger" title="Apagar categoria">
                          <Icons.FiTrash
                            size={20}
                            onClick={() => handleDelete(category)}
                          />
                        </Tooltip>
                      </Actions>
                    </TableBodyColumn>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>

        <Modal
          show={isShowingModal}
          onClose={handleCloseModal}
          title={categoryEdit ? 'Editar categoria' : 'Nova categoria'}
        >
          <FormCategory
            onSubmitted={handleCategoryAddedOrEdited}
            onCancel={handleCloseModal}
            categoryEdit={categoryEdit}
          />
        </Modal>
      </Container>
    </>
  );
}

export default Config;
