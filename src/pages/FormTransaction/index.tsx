import React, { useCallback, useRef, useState, useEffect, forwardRef, ForwardedRef, ForwardRefExoticComponent, type ReactEventHandler } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Container, Title, NewTransactonContainer, Footer } from './styles';
import ReactSelect, { SelectInstance } from 'react-select';

import { useTheme } from '../../hooks/theme';

import { Category, Transaction } from '../../services/interfaces';
import getValidationErrors from '../../utils/getValidationErrors';
import getCustomSelectOptions from '../../utils/getCustomSelectOptions';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import CategoryIconOption from './CategoryIconOption';
import CategoryIconSingleValue from './CategoryIconSingleValue';

import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Textarea from '../../components/TextArea';
// biome-ignore lint/style/useImportType: <explanation>
import TransactionTypeSelector, {
  SelectedType,
} from '../../components/TransactionTypeSelector';
import { getAllCategories } from '../../services/category/get-all-categories';
import { createTransaction } from '../../services/transaction/create-transaction';
import { editTransaction } from '../../services/transaction/edit-transaction';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface NewTransactionFormData {
  title: string;
  type: 'income' | 'outcome';
  value: string;
  category: Category;
  category_id: string;
  transaction_date: Date;
  description: string;
}
interface FormTransactionProps {
  onSubmitted(): void;
  onCancel(): void;
  transactionEdit?: Transaction;
}

const schema = Yup.object().shape({
  // title: Yup.string().required('Título é obrigatório'),
  type: Yup.string().required('Tipo da transação é obrigatório'),
  // category: Yup.object().required('Categoria é obrigatória'),
  // category: Yup.object().shape({
  //   id: Yup.string().required('Id da categoria é obrigatório'),
  //   title: Yup.string().required('Título da categoria é obrigatório'),
  // }),
  // transaction_date: Yup.string().required('Data da transação é obrigatória'),
  // value: Yup.number().moreThan(0).required('Valor é obrigatório'),
  // description: Yup.string(),
});


export type TransactionForm = Yup.InferType<typeof schema>;

function FormTransaction({
  onSubmitted,
  onCancel,
  transactionEdit,
}: FormTransactionProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme } = useTheme();
  // const formRef = useRef<FormHandles>(null);
  // const [transactionEdit, setTransactionEdit] = useState<Transaction>();

  const [categoryValue, setCategoryValue] = React.useState();
  const [transactionType, setTransactionType] = React.useState('asd');
  const [transactionDate, setTransactionDate] = React.useState<
    string | undefined
  >(format(new Date(), 'yyyy-MM-dd'));

  const onChangeCategory = (e: any): void => {
    console.log('onChangeCategory: ', e);

    setCategoryValue(e);
  };

  const onChangeTransactionDate = (e: any): void => {
    setTransactionDate(e.target.value);
  };

  const handleTypeSelect = useCallback((selectedType: SelectedType) => {
    // formRef.current?.setFieldValue('type', selectedType);
    console.log('handleTypeSelect: ', selectedType);
  }, []);

  const handleTypeSelect2 = useCallback((event: any) => {
    // formRef.current?.setFieldValue('type', selectedType);
    console.log('handleTypeSelect2: ', event);

  }, []);

  // useEffect(() => {
  //   async function fetchCategories(): Promise<void> {
  //     const { data } = await getAllCategories();
  //     setCategories(data);
  //   }
  //   fetchCategories();

  //   if (transactionEdit) {
  //     console.log(`Editando: ${JSON.stringify(transactionEdit)}`);

  //     // setTransactionEdit(location.state);
  //     // setCategoryValue(transactionEdit.id);

  //     handleTypeSelect(transactionEdit.type);
  //     const date = format(
  //       new Date(transactionEdit.transaction_date),
  //       'yyyy-MM-dd',
  //     );

  //     setTransactionDate(date);
  //   } else {
  //     console.log('NAO EDITANDO');

  //   }
  // }, [handleTypeSelect, transactionEdit]);
  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      const { data } = await getAllCategories();
      setCategories(data);
    }
    fetchCategories();

    // const asd = categories.map((c) => { return { label: c.title, value: c.id } } );
    // setList(asd)

    if (transactionEdit) {
      console.log(`Editando transação: ${JSON.stringify(transactionEdit)}`);

      // setTransactionEdit(location.state);
      // setCategoryValue(transactionEdit.id);

      // handleTypeSelect(transactionEdit.type);
      const date = format(
        new Date(transactionEdit.transaction_date),
        'yyyy-MM-dd',
      );

      setTransactionDate(date);
    } else {
      console.log('Criando transação');

    }
  }, []);

  // useEffect(() => {
  //   if (location.state?.category) {
  //     console.log(`Editando: ${JSON.stringify(location.state)}`);

  //     setTransactionEdit(location.state);
  //     setCategoryValue(location.state.category);

  //     handleTypeSelect(location.state.type);
  //   }
  // }, [handleTypeSelect, location.state]);

  // const handleSubmit2 = useCallback(async (formData: NewTransactionFormData) => {
  //   try {
  //     // formRef.current?.setErrors({});
  //     setIsLoading(true);

  //     const transaction = {
  //       ...transactionEdit,
  //       title: formData.title,
  //       type: formData.type,
  //       value: parseFloat(formData.value),
  //       category_id: formData.category,
  //       transaction_date: formData.transaction_date,
  //       description: formData.description,
  //     };

  //     // const schema = Yup.object().shape({
  //     //   title: Yup.string().required('Título é obrigatório'),
  //     //   type: Yup.string().required('Tipo da transação é obrigatório'),
  //     //   category: Yup.string().required('Categoria é obrigatória'),
  //     //   transaction_date: Yup.string().required(
  //     //     'Data da transação é obrigatória',
  //     //   ),
  //     //   value: Yup.number().moreThan(0).required('Valor é obrigatório'),
  //     // });

  //     // await schema.validate(formData, {
  //     //   abortEarly: false,
  //     // });

  //     // await api.post('/transactions', {
  //     //   title: formData.title,
  //     //   type: formData.type,
  //     //   value: parseFloat(formData.value),
  //     //   category_id: formData.category,
  //     //   dateTransaction: formData.dateTransaction,
  //     // });

  //     if (transaction.id) {
  //       console.log('Transaction edited: ', transaction);
  //       await api.put(`/transactions/${transaction.id}`, transaction);
  //     } else {
  //       console.log('Transaction created: ', transaction);
  //       await api.post(`/transactions`, transaction);
  //     }

  //     toast.success(
  //       `Transação ${transactionEdit ? 'editada' : 'cadastrada'} com sucesso`,
  //     );
  //     // formRef.current?.reset();
  //     setTransactionDate(undefined);
  //     setIsLoading(false);
  //     onSubmitted();
  //   } catch (err) {
  //     if (err instanceof Yup.ValidationError) {
  //       const errors = getValidationErrors(err);
  //       // formRef.current?.setErrors(errors);
  //       err.inner.forEach(element => {
  //         toast.error(element.message);
  //       });
  //     } else if (formData.type === 'income') {
  //       toast.error(
  //         'Não foi possível cadastrar a entrada. Verifique os dados e tente novamente',
  //       );
  //     } else {
  //       toast.error(
  //         'Não foi possível cadastrar a saída, cheque se há saldo disponível e tente novamente',
  //       );
  //     }

  //     setIsLoading(false);
  //   }
  // }, []);

  const labelButtonSubmit = transactionEdit ? 'Editar' : 'Enviar';

  const { register, handleSubmit, formState, control } = useForm<TransactionForm>();
  // const { register, handleSubmit, formState, reset, control } = useForm<TransactionForm>({ resolver: yupResolver(schema), });

  const handleAddOrEditTransaction: SubmitHandler<TransactionForm> = async (data) => {
    console.log('FORM: ', data);

    // if (transactionEdit) {
    //   console.log('Transaction edited: ', data);
    //   await editTransaction(transactionEdit.id, data);
    // } else {
    //   console.log('Transaction created: ', data);
    //   await createTransaction(data);
    // }
    // toast.success(
    //   `Transação ${transactionEdit ? 'editada' : 'cadastrada'} com sucesso`,
    // );

    // setTransactionDate(undefined);
    // setIsLoading(false);
    // onSubmitted();
  }
  return (
    <Container>
      <Title>{!transactionEdit ? 'Nova Transação' : 'Editar Transação'}</Title>
      <NewTransactonContainer>
        <form onSubmit={handleSubmit(handleAddOrEditTransaction)}>
          <div style={{display: 'flex', flexDirection: 'column', rowGap: 16}}>

          {/* <Input
            {...register('title')}
            name="title"
            // containerClassName="form-group"
            placeholder="Título"
          />
          {formState.errors.title && (
            <p className="text-red-400 text-sm">
              {formState.errors.title.message}
            </p>
          )} */}

          <TransactionTypeSelector
            {...register('type')}
            // name="type"
            // onSelect2={handleTypeSelect}
            // onSelect={handleTypeSelect2}
            // value={transactionType}
            // defaultValue={transactionType}
            // inputRef={register}
          />

        {/* <Controller
          name="type"
          control={control}
          render={({ field }) => (
            // <TransactionTypeSelector {...field} name="type" onSelect2={handleTypeSelect} value={''} />
            <TransactionTypeSelector {...field} name="type" onSelect2={handleTypeSelect} />
          )}
        /> */}
          {/* <TransactionTypeSelector {...register('type')} name="type" onSelect={handleTypeSelect} /> */}
          {/* {formState.errors.type && (
            <p className="text-red-400 text-sm">
              {formState.errors.type.message}
            </p>
          )} */}


          {/* <Controller
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
              />
            )}
          />
          {formState.errors.category && (
            <p className="text-red-400 text-sm">
              {formState.errors.category.message}
            </p>
          )} */}

          <Input
            // {...register('transaction_date')}
            name="transaction_date"
            // containerClassName="form-group"
            type="date"
            value={transactionDate}
            onChange={onChangeTransactionDate}
          />
          {/* {formState.errors.transaction_date && (
            <p className="text-red-400 text-sm">
              {formState.errors.transaction_date.message}
            </p>
          )} */}

          {/* <Input
            {...register('value')}
            name="value"
            // containerClassName="form-group"
            placeholder="Valor"
            type="number"
            inputMode="decimal"
            step={0.01}
          />
          {formState.errors.value && (
            <p className="text-red-400 text-sm">
              {formState.errors.value.message}
            </p>
          )} */}

          {/* <Textarea
            {...register('description')}
            name="description"
            containerClassName="form-group"
            placeholder="Descrição"
            inputMode="text"
          />
          {formState.errors.description && (
            <p className="text-red-400 text-sm">
              {formState.errors.description.message}
            </p>
          )} */}

          {/* <Footer> */}
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
              ) : (
                labelButtonSubmit
              )}
            </Button>
          </div>

          {/* </Footer> */}
        </form>
      </NewTransactonContainer>
    </Container>
  );
}

export default FormTransaction;
