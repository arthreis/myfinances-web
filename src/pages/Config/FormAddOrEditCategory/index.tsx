import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import * as IconsFi from 'react-icons/fi';
// import { FormHandles } from '@unform/core';
// import { Form } from '@unform/web';
import ReactLoading from 'react-loading';
import type { CSSProperties } from 'styled-components';

import { useTheme } from '../../../hooks/theme';
import getValidationErrors from '../../../utils/getValidationErrors';
import { getCustomSelectOptionsModal } from '../../../utils/getCustomSelectOptions';

import api from '../../../services/api';
import type { Category } from '../../../services/interfaces';

import { Container, Header, Footer, CancelButton, Body } from './styles';

import Button from '../../../components/Button';
import ColorPicker from '../../../components/ColorPicker';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import CategoryIconOptionConfig from '../CategoryIconOptionConfig';
import CategoryIconSingleValueConfig from '../CategoryIconSingleValueConfig';
import { createCategory, type CategoryFormData } from '../../../services/category/create-category';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormAddOrEditCategoryProps {
  onSubmitted(category: Category): void;
  onCancel(): void;
  categoryEdit?: Category;
}

function FormAddOrEditCategory({
  onSubmitted,
  onCancel,
  categoryEdit,
}: FormAddOrEditCategoryProps): React.JSX.Element {
  const { theme } = useTheme();
  // const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Icons = {

    ...(IconsFi as any),
  };
  const icons = Object.keys(Icons).map(icon => {
    const id = `${icon}`;
    return {
      id,
      Component: Icons[id],
    };
  });

  const [value, setValue] = React.useState(
    categoryEdit
      ? icons.filter(i => i.id === categoryEdit?.icon)
      : ({} as Category),
  );

  const onChange = (e: any): void => {
    setValue(e);
  };

  const labelButtonSubmit = categoryEdit ? 'Editar' : 'Enviar';

  const loadCategoryOptions = useCallback(

    (inputValue: string, callback: (...args: any[]) => any) => {
      setTimeout(
        () =>
          callback(
            icons
              .filter(icon =>
                icon.id.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .splice(0, 77),
          ),
        1000,
      );
    },
    [icons],
  );

  const LoadingSpinner = (
    <ReactLoading
      type="spin"
      color={theme.colors.secondaryText}
      width={25}
      height={25}
    />
  );

  // const handleSubmit = useCallback(
  //   async (formData: AddCategoryFormData) => {
  //     try {
  //       // formRef.current?.setErrors({});
  //       setIsLoading(true);

  //       const schema = Yup.object().shape({
  //         title: Yup.string().required('Título é obrigatório'),
  //         icon: Yup.string().required('Ícone é obrigatório'),
  //         background_color_dark: Yup.string().required(
  //           'Cor Dark é obrigatória',
  //         ),
  //         background_color_light: Yup.string().required(
  //           'Cor Light é obrigatória',
  //         ),
  //       });

  //       await schema.validate(formData, {
  //         abortEarly: false,
  //       });

  //       console.log('CATEGORY-EDIT: ', categoryEdit);
  //       console.log(categoryEdit ? 'EDITANDO: ' : 'CRIANDO: ', formData);

  //       const { data } = categoryEdit
  //         ? await api.put(`/categories/${categoryEdit.id}`, formData)
  //         : await api.post('/categories', formData);

  //       setIsLoading(false);

  //       onSubmitted({ ...data });
  //     } catch (err) {
  //       if (err instanceof Yup.ValidationError) {
  //         const errors = getValidationErrors(err);

  //         // formRef.current?.setErrors(errors);
  //         console.error('Error: ', errors);
  //       }

  //       setIsLoading(false);
  //     }
  //   },
  //   [categoryEdit, onSubmitted],
  // );

  const schema = Yup.object().shape({
    title: Yup.string().required("Titulo é obrigatório"),
    icon: Yup.string().required("Icone é obrigatório"),
    background_color_dark: Yup.string().required("Cor escura é obrigatória"),
    background_color_light: Yup.string().required("Cor clara é obrigatória"),
  });

  const { register, handleSubmit, formState, reset } =
  useForm<CategoryFormData>({
    resolver: yupResolver(schema),
  });

  async function handleAddOrEditCategory(data: CategoryFormData) {
		await createCategory({
      title: data.title,
      icon: data.icon,
      background_color_dark: data.background_color_dark,
      background_color_light: data.background_color_light,
    });

    // toast.success("Cadastro realizado com sucesso!");

    setIsLoading(false);

		reset()

	}

  return (
    <Container>
      {/* <Form onSubmit={handleSubmit} ref={formRef} initialData={categoryEdit}> */}
      <form onSubmit={handleSubmit(handleAddOrEditCategory)}>
        <Header>
          {categoryEdit ? <h1>Editar categoria</h1> : <h1>Nova categoria</h1>}
        </Header>

        <Body>
          <Input
            {...register('title')}
            // containerClassName="form-group"
            name="title"
            placeholder="Título"
          />

          <Select
            {...register('icon')}
            async
            styles={{
              ...getCustomSelectOptionsModal(theme),
              menuList: (provided: CSSProperties) => ({
                ...provided,
                padding: '5px',
                display: 'grid',
                gridTemplateColumns:
                  '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                rowGap: '10px',
              }),
            }}
            loadOptions={loadCategoryOptions}
            name="icon"
            keyField="id"
            placeholder="Ícone"
            options={icons}
            components={{
              Option: CategoryIconOptionConfig,
              SingleValue: CategoryIconSingleValueConfig,
            }}
            onChange={onChange}
            value={value}
          />

          <ColorPicker
            {...register('background_color_dark')}
            // containerClassName="form-group"
            name="background_color_dark"
            placeholder="Cor Dark"
            color={categoryEdit?.background_color_dark}
          />
          <ColorPicker
            {...register('background_color_light')}
            // containerClassName="form-group"
            name="background_color_light"
            placeholder="Cor Light"
            color={categoryEdit?.background_color_light}
          />
        </Body>

        <Footer>
          <CancelButton type="button" onClick={onCancel} disabled={isLoading}>
            {isLoading ? LoadingSpinner : 'Cancelar'}
          </CancelButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? LoadingSpinner : labelButtonSubmit}
          </Button>
        </Footer>
      </form>
    </Container>
  );
}

export default FormAddOrEditCategory;
