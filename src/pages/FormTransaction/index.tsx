import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Container, Title, NewTransactonContainer, Footer } from './styles';

import { useTheme } from '../../hooks/theme';

import api from '../../services/api';
import { Category, Transaction } from '../../services/interfaces';
import getValidationErrors from '../../utils/getValidationErrors';
import getCustomSelectOptions from '../../utils/getCustomSelectOptions';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import CategoryIconOption from './CategoryIconOption';
import CategoryIconSingleValue from './CategoryIconSingleValue';

// import TransactionTypeSelector, {
//   SelectedType,
// } from '../../components/TransactionTypeSelector';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Textarea from '../../components/TextArea';
import TransactionTypeSelector, {
  SelectedType,
} from '../../components/TransactionTypeSelector';

interface NewTransactionFormData {
  title: string;
  type: 'income' | 'outcome';
  value: string;
  category: string;
  category_id: string;
  transaction_date: Date;
  description: string;
}

interface FormTransactionProps {
  onSubmitted(): void;
  onCancel(): void;
  transactionEdit?: Transaction;
}

function FormTransaction({
  onSubmitted,
  onCancel,
  transactionEdit,
}: FormTransactionProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme } = useTheme();
  const formRef = useRef<FormHandles>(null);
  // const [transactionEdit, setTransactionEdit] = useState<Transaction>();

  const [categoryValue, setCategoryValue] = React.useState();
  const [transactionDate, setTransactionDate] = React.useState<
    string | undefined
  >(format(new Date(), 'yyyy-MM-dd'));

  const onChangeCategory = (e: any): void => {
    setCategoryValue(e);
  };

  const onChangeTransactionDate = (e: any): void => {
    setTransactionDate(e.target.value);
  };

  const handleTypeSelect = useCallback((selectedType: SelectedType) => {
    formRef.current?.setFieldValue('type', selectedType);
  }, []);

  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    fetchCategories();

    if (transactionEdit) {
      console.log(`Editando: ${JSON.stringify(transactionEdit)}`);

      // setTransactionEdit(location.state);
      // setCategoryValue(transactionEdit.id);

      handleTypeSelect(transactionEdit.type);
      const date = format(
        new Date(transactionEdit.transaction_date),
        'yyyy-MM-dd',
      );

      setTransactionDate(date);
    }
  }, [handleTypeSelect, transactionEdit]);

  // useEffect(() => {
  //   if (location.state?.category) {
  //     console.log(`Editando: ${JSON.stringify(location.state)}`);

  //     setTransactionEdit(location.state);
  //     setCategoryValue(location.state.category);

  //     handleTypeSelect(location.state.type);
  //   }
  // }, [handleTypeSelect, location.state]);

  const handleSubmit = useCallback(async (formData: NewTransactionFormData) => {
    try {
      formRef.current?.setErrors({});
      setIsLoading(true);

      const transaction = {
        ...transactionEdit,
        title: formData.title,
        type: formData.type,
        value: parseFloat(formData.value),
        category_id: formData.category,
        transaction_date: formData.transaction_date,
        description: formData.description,
      };

      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        type: Yup.string().required('Tipo da transação é obrigatório'),
        category: Yup.string().required('Categoria é obrigatória'),
        transaction_date: Yup.string().required(
          'Data da transação é obrigatória',
        ),
        value: Yup.number().moreThan(0).required('Valor é obrigatório'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      // await api.post('/transactions', {
      //   title: formData.title,
      //   type: formData.type,
      //   value: parseFloat(formData.value),
      //   category_id: formData.category,
      //   dateTransaction: formData.dateTransaction,
      // });

      if (transaction.id) {
        console.log('Transaction edited: ', transaction);
        await api.put(`/transactions/${transaction.id}`, transaction);
      } else {
        console.log('Transaction created: ', transaction);
        await api.post(`/transactions`, transaction);
      }

      toast.success(
        `Transação ${transactionEdit ? 'editada' : 'cadastrada'} com sucesso`,
      );
      formRef.current?.reset();
      setTransactionDate(undefined);
      setIsLoading(false);
      onSubmitted();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        err.inner.forEach(element => {
          toast.error(element.message);
        });
      } else if (formData.type === 'income') {
        toast.error(
          'Não foi possível cadastrar a entrada. Verifique os dados e tente novamente',
        );
      } else {
        toast.error(
          'Não foi possível cadastrar a saída, cheque se há saldo disponível e tente novamente',
        );
      }

      setIsLoading(false);
    }
  }, []);

  const labelButtonSubmit = transactionEdit ? 'Editar' : 'Enviar';

  return (
    <Container>
      <Title>{!transactionEdit ? 'Nova Transação' : 'Editar Transação'}</Title>
      <NewTransactonContainer>
        <Form
          ref={formRef}
          initialData={transactionEdit}
          onSubmit={handleSubmit}
        >
          <Input
            name="title"
            containerClassName="form-group"
            placeholder="Título"
          />

          <TransactionTypeSelector name="type" onSelect={handleTypeSelect} />

          <Select
            name="category"
            keyField="id"
            options={categories}
            styles={getCustomSelectOptions(theme)}
            getOptionLabel={(category: any) => category.title}
            components={{
              Option: CategoryIconOption,
              SingleValue: CategoryIconSingleValue,
            }}
            placeholder="Selecione uma categoria"
            value={categoryValue}
            onChange={onChangeCategory}
          />

          <Input
            name="transaction_date"
            containerClassName="form-group"
            type="date"
            value={transactionDate}
            onChange={onChangeTransactionDate}
          />

          <Input
            name="value"
            containerClassName="form-group"
            placeholder="Valor"
            type="number"
            inputMode="decimal"
            step={0.01}
          />

          <Textarea
            name="description"
            containerClassName="form-group"
            placeholder="Descrição"
            inputMode="text"
          />

          <Footer>
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
          </Footer>
        </Form>
      </NewTransactonContainer>
    </Container>
  );
}

export default FormTransaction;
