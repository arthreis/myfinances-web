import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

function SignUp(): React.JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 caracters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        toast.success('Cadastro realizado com sucesso!');

        navigate('Login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [navigate],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoFinances" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/">Já tem uma conta? Logue-se agora</Link>
      </Content>
    </Container>
  );
}

export default SignUp;
