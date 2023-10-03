import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import api from '../../services/api';
import { Category } from '../../services/interfaces';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  TableContainer,
  TableBodyColumn,
  Title,
  Square,
  ColorInfoContainer,
  CustomTooltip,
  NewCategoryButton,
  Actions,
} from './styles';
import FormAddOrEditCategory from './FormAddOrEditCategory';
import Burguer from '../../components/Burguer';

const ReactSwal = withReactContent(Swal);

function Config(): React.JSX.Element {
  const { theme } = useTheme();
  const [categoryEdit, setCategoryEdit] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const { data } = await api.get('/categories');
      setCategories(data);
    }

    loadCategories();
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleOpenModal = useCallback((category?: Category) => {
    setCategoryEdit(category);
    setIsShowingModal(true);
  }, []);

  const handleCategoryAddedOrEdited = useCallback(
    (categoryAddedOrEdited: Category) => {
      let isEdited = false;
      const newState = categories.map(c => {
        if (c.id === categoryAddedOrEdited.id) {
          isEdited = true;
          return categoryAddedOrEdited;
        }
        return c;
      });
      setCategories(isEdited ? newState : [...newState, categoryAddedOrEdited]);

      toast.success(
        `Categoria ${isEdited ? 'editada' : 'adicionada'} com sucesso!`,
      );

      handleCloseModal();
    },
    [categories, handleCloseModal],
  );

  const filterAndSetCategories = useCallback(
    (categoryToDelete: Category) => {
      const newCategories = categories.filter(
        category => category.id !== categoryToDelete.id,
      );
      setCategories([...newCategories]);
    },
    [categories],
  );

  const handleDelete = useCallback(
    async (categoryToDelete: Category) => {
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
            // content: 'themed-swal-text',
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
    },
    [theme, filterAndSetCategories],
  );

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Burguer open={open} setOpen={setOpen} />
      <Header open={open} size="small" />
      <Container>
        <Title>Configurações</Title>
        <NewCategoryButton type="button" onClick={() => handleOpenModal()}>
          Criar categoria
        </NewCategoryButton>
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
                const Icon = (Icons as any)[category.icon];
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
                        <CustomTooltip
                          className="edit"
                          title="Editar categoria"
                        >
                          <Icons.FiEdit
                            size={20}
                            onClick={() => handleOpenModal(category)}
                          />
                        </CustomTooltip>
                        <CustomTooltip
                          className="delete"
                          title="Apagar categoria"
                        >
                          <Icons.FiTrash
                            size={20}
                            onClick={() => handleDelete(category)}
                          />
                        </CustomTooltip>
                      </Actions>
                    </TableBodyColumn>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>

        <Modal show={isShowingModal} onClose={handleCloseModal} height={650}>
          <FormAddOrEditCategory
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
