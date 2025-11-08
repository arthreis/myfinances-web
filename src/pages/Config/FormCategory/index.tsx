import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import * as IconsFi from 'react-icons/fi';
import ReactLoading from 'react-loading';
import type { CSSProperties } from 'styled-components';

import { useTheme } from '@/hooks/theme';
import { getCustomSelectOptionsModal } from '@/utils/getCustomSelectOptions';

import type { Category, IconMap, IconProps } from '@/schemas';

import { Container, Footer } from './styles';

import Button from '@/components/Button';
import ColorPicker from '@/components/ColorPicker';
import Input from '@/components/Input';
import Select from '@/components/Select';
import CategoryIconOptionConfig from '../CategoryIconOptionConfig';
import CategoryIconSingleValueConfig from '../CategoryIconSingleValueConfig';
import { createCategory } from '@/services/category/create-category';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editCategory } from '@/services/category/edit-category';
import { isValidHexColor } from '@/utils/isValidHexColor';
import type { Options } from 'react-select';

interface FormCategoryProps {
  readonly onSubmitted: (category: Category) => void;
  readonly onCancel: () => void;
  readonly categoryEdit?: Category;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Titulo é obrigatório'),
  icon: Yup.object()
    .shape({
      id: Yup.string().required('Id do ícone é obrigatório'),
      Component: Yup.object(),
    })
    .required('Ícone é obrigatório'),
  color: Yup.string().required('Cor é obrigatória'),
});

export type CategoryForm = Yup.InferType<typeof schema>;



function FormCategory({
  onSubmitted,
  onCancel,
  categoryEdit,
}: FormCategoryProps): React.JSX.Element {
  const { theme } = useTheme();
  const labelButtonSubmit = categoryEdit ? 'Editar' : 'Criar';
  const Icons = { ...(IconsFi as IconMap) };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const allIcons: IconProps[] = Object.keys(Icons).map(icon => {
    const id = `${icon}`;
    return {
      id,
      Component: Icons[id],
    };
  });

  const getIcon = (categoryEdit: Category | undefined) => {
    if (categoryEdit) {
      const icon = allIcons.filter(i => i.id === categoryEdit.icon);
      const data = icon.length > 0 ? icon[0] : ({} as IconProps);
      return data;
    }
      return {} as IconProps;
  };

  const [iconValue, setIconValue] = React.useState(getIcon(categoryEdit));

  const loadCategoryOptions = useCallback(
    (inputValue: string, callback: (options: Options<IconProps>) => void) => {
      setTimeout(
        () =>
          callback(
            allIcons
              .filter(icon =>
                icon.id.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .splice(0, 77),
          ),
        1000,
      );
    },
    [allIcons],
  );

  const LoadingSpinner = (
    <ReactLoading
      type="spin"
      color={theme.colors.secondaryText}
      width={25}
      height={25}
    />
  );

  const { register, handleSubmit, control, formState, reset, setValue } =
    useForm({ resolver: yupResolver(schema) });

  const onChangeIcon = (e: IconProps): void => {
    setIconValue(e);
    setValue('icon', e);
  };

  const onSelectColorLight = (e: string): void => {
    if (isValidHexColor(e)) {
      setValue('color', e);
    }
  };

  const handleSaveCategory: SubmitHandler<CategoryForm> = async (
    category: CategoryForm,
  ) => {
    setIsLoading(true);
    let response: Category;
    try {
      if (categoryEdit) {
        response = await editingCategory(categoryEdit.id, category);
      } else {
        response = await creatingCategory(category);
      }
      onSubmitted({ ...response });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const creatingCategory = async (category: CategoryForm) => {
    const { data } = await createCategory({
      title: category.title,
      icon: category.icon.id,
      color: category.color,
    });
    return data;
  };

  const editingCategory = async (id: string, category: CategoryForm) => {
    const { data } = await editCategory(id, {
      title: category.title,
      icon: category.icon.id,
      color: category.color,
    });
    return data;
  };

  React.useEffect(() => {
    if (categoryEdit) {
      onChangeIcon(iconValue);
    }
  }, [categoryEdit]);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSaveCategory)}>
        <Input
          {...register('title')}
          name="title"
          placeholder="Título"
          defaultValue={categoryEdit?.title}
        />
        {formState.errors.title && (
          <p className="text-red-400 text-sm">
            {formState.errors.title.message}
          </p>
        )}

        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <Select<IconProps>
              {...field}
              async
              options={allIcons}
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
              components={{
                Option: CategoryIconOptionConfig, //all options to select
                SingleValue: CategoryIconSingleValueConfig, //option selected
              }}
              placeholder="Selecione um ícone"
              defaultValue={iconValue}
              onChange={onChangeIcon}
            />
          )}
        />
        {formState.errors.icon && (
          <p className="text-red-400 text-sm">
            {formState.errors.icon.message}
          </p>
        )}

        <ColorPicker
          {...register('color')}
          name="color"
          placeholder="Cor"
          color={categoryEdit?.color}
          defaultValue={categoryEdit?.color}
          onSelectColor={onSelectColorLight}
          onChange={e => onSelectColorLight(e.target.value)}
        />
        {formState.errors.color && (
          <p className="text-red-400 text-sm">
            {formState.errors.color.message}
          </p>
        )}

        <Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {isLoading ? LoadingSpinner : 'Cancelar'}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? LoadingSpinner : labelButtonSubmit}
          </Button>
        </Footer>
      </form>
    </Container>
  );
}

export default FormCategory;
