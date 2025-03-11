import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  ForwardRefExoticComponent,
  type ReactEventHandler,
  type SetStateAction,
  type ChangeEvent,
} from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Container } from './styles';

import { useTheme } from '@/hooks/theme';

import { Category, Transaction } from '@/schemas';
import getValidationErrors from '@/utils/getValidationErrors';
import getCustomSelectOptions from '@/utils/getCustomSelectOptions';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import CategoryIconOption from './CategoryIconOption';
import CategoryIconSingleValue from './CategoryIconSingleValue';

import { format } from 'date-fns';
import Textarea from '@/components/TextArea';
import TransactionTypeSelector, {
  SelectedType,
} from '@/components/TransactionTypeSelector';
import { getAllCategories } from '@/services/category/get-all-categories';
import { createTransaction } from '@/services/transaction/create-transaction';
import { editTransaction } from '@/services/transaction/edit-transaction';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormTransactionProps {
  onSubmitted(): void;
  onCancel(): void;
  transactionEdit?: Transaction;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  type: Yup.string().required('Tipo da transação é obrigatório'),
  category: Yup.object().required('Categoria é obrigatória'),
  category_id: Yup.string().required('Id da categoria é obrigatória'),
  // category: Yup.object().shape({
  //   id: Yup.string().required('Id da categoria é obrigatório'),
  //   title: Yup.string().required('Título da categoria é obrigatório'),
  // }),
  transaction_date: Yup.string().required('Data da transação é obrigatória'),
  value: Yup.number().moreThan(0).required('Valor é obrigatório'),
  description: Yup.string().required(),
});

export type TransactionForm = Yup.InferType<typeof schema>;

function FormTransaction({
  onSubmitted,
  transactionEdit,
}: FormTransactionProps): React.JSX.Element {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionDate, setTransactionDate] = React.useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const onChangeTransactionDate = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTransactionDate(e.target.value);
  };

  const onChangeCategory = (e: any): void => {
    setValue('category', e);
    setValue('category_id', e.id);
  };

  const handleTypeSelect = useCallback((selectedType: SelectedType) => {
    setValue('type', selectedType);
  }, []);

  const { register, handleSubmit, formState, control, reset, setValue } =
    useForm<TransactionForm>(
      // { resolver: yupResolver(schema), }
    );

  const loadFormTransaction = (transactionEdit: Transaction) => {
    console.log(
      `Carregando formulário com a transação escolhida: ${JSON.stringify(transactionEdit)}`,
    );

    const date = format(
      new Date(transactionEdit.transaction_date),
      'yyyy-MM-dd',
    );
    setTransactionDate(date);
    onChangeCategory(transactionEdit.category);
  };

  const handleSubmitTransaction: SubmitHandler<
    TransactionForm
  > = async transaction => {
    setIsLoading(true);
    try {
      if (transactionEdit) {
        await editTransaction(transactionEdit.id, transaction);
      } else {
        await createTransaction(transaction);
      }
      onSubmitted();
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      const { data } = await getAllCategories();
      setCategories(data);
    }
    fetchCategories();

    if (transactionEdit) {
      loadFormTransaction(transactionEdit);
    } else {
      console.log('Criando transação');
    }
  }, []);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
        <Input
          {...register('title')}
          name="title"
          placeholder="Título"
          defaultValue={transactionEdit?.title}
        />
        {formState.errors.title && (
          <p className="text-red-400 text-sm">
            {formState.errors.title.message}
          </p>
        )}

        <TransactionTypeSelector
          {...register('type')}
          onSelectRadio={handleTypeSelect}
          radioValue={transactionEdit?.type}
          defaultValue={transactionEdit?.type}
        />
        {formState.errors.type && (
          <p className="text-red-400 text-sm">
            {formState.errors.type.message}
          </p>
        )}

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={categories}
              styles={getCustomSelectOptions(theme)}
              getOptionLabel={(category: any) => category.title}
              components={{
                Option: CategoryIconOption,
                SingleValue: CategoryIconSingleValue,
              }}
              placeholder="Selecione uma categoria"
              defaultValue={transactionEdit?.category}
              onChange={onChangeCategory}
            />
          )}
        />
        {formState.errors.category && (
          <p className="text-red-400 text-sm">
            {formState.errors.category.message}
          </p>
        )}

        <Input
          {...register('transaction_date')}
          name="transaction_date"
          type="date"
          onChange={onChangeTransactionDate}
          value={transactionDate}
        />
        {formState.errors.transaction_date && (
          <p className="text-red-400 text-sm">
            {formState.errors.transaction_date.message}
          </p>
        )}

        <Input
          {...register('value')}
          name="value"
          placeholder="Valor"
          type="number"
          inputMode="decimal"
          step={0.01}
          defaultValue={transactionEdit?.value}
        />
        {formState.errors.value && (
          <p className="text-red-400 text-sm">
            {formState.errors.value.message}
          </p>
        )}

        <Textarea
          {...register('description')}
          name="description"
          placeholder="Descrição"
          inputMode="text"
          defaultValue={transactionEdit?.description}
        />
        {formState.errors.description && (
          <p className="text-red-400 text-sm">
            {formState.errors.description.message}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div>
              <ReactLoading
                type="spin"
                color={theme.colors.secondaryText}
                width={25}
                height={25}
              />
            </div>
          ) : transactionEdit ? (
            'Editar'
          ) : (
            'Criar'
          )}
        </Button>
      </form>
    </Container>
  );
}

export default FormTransaction;
