import React, { useRef, useEffect } from 'react';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

function SignIn(): React.JSX.Element {
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    signOut();
  }, [signOut]);

  async function handleSubmit(formData: SignInFormData): Promise<void> {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await signIn({
        email: formData.email,
        password: formData.password,
      });

      navigate('/dashboard');
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);
        formRef?.current?.setErrors(validationErrors);
      } else if (err instanceof AxiosError) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.error('Usuário e/ou senha inválidos');
            console.error('Error: ', err.message);
          }
        } else {
          toast.error(err.message);
          console.error('Error: ', err.message);
        }
      }
    }
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoFinances" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/sign-up">Não tem uma conta? Cadastre-se agora</Link>
      </Content>
    </Container>
  );
}

export default SignIn;
