import type React from 'react';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock } from 'react-icons/fi';

import Logo from '@/assets/logo.svg?react';

import { useAuth } from '@/hooks/auth';

import getValidationErrors from '@/utils/getValidationErrors';

import Input from '@/components/Input';
import Button from '@/components/Button';

import { Container, Content, Form } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@/hooks/theme';
import { AxiosError } from 'axios';

const schema = Yup.object().shape({
  email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos').required(),
});

type SignInForm = Yup.InferType<typeof schema>;

function SignIn(): React.JSX.Element {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });

  async function handleSignIn(data: SignInForm): Promise<void> {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      toast.success('Login realizado com sucesso!');
      reset();
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.error('Usuário e/ou senha inválidos');
            console.error('Error: ', err.message);
          }
        } else {
          toast.error(err.message);
          console.error('Error: ', err.message);
        }
      } else {
        console.error('Something is wrong!');
      }
    }
  }
  const { theme } = useTheme();

  return (
    <Container>
      <Content>
        <Logo color={theme.colors.primary} />

        <Form onSubmit={handleSubmit(handleSignIn)}>
          <Input
            {...register('email')}
            id="email"
            // icon={FiMail}
            placeholder="E-mail"
          />
          {formState.errors.email && (
            <p className="text-red-400 text-sm">
              {formState.errors.email?.message}
            </p>
          )}

          <Input
            {...register('password')}
            id="password"
            // icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          {formState.errors.password && (
            <p className="text-red-400 text-sm">
              {formState.errors.password.message}
            </p>
          )}

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/sign-up">Não tem uma conta? Cadastre-se agora</Link>
      </Content>
    </Container>
  );
}

export default SignIn;
