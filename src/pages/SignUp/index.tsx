import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '@/assets/logo.svg?react';
import Input from '@/components/Input';
import Button from '@/components/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSignUp } from '@/services/user/sign-up';
import { Container, Content } from './styles';
import { useTheme } from '@/hooks/theme';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 caracters').required('Senha é obrigatória'),
});

export type SignUpForm = Yup.InferType<typeof schema>;

function SignUp(): React.JSX.Element {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  async function handleSignUp(data: SignUpForm) {
    await userSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    toast.success('Cadastro realizado com sucesso!');

    reset();

    navigate('/');
  }

  const { theme } = useTheme();

  return (
    <Container>
      <Content>
        <Logo color={theme.colors.primary} />

        <form onSubmit={handleSubmit(handleSignUp)}>
          <Input
            {...register('name')}
            name="name"
            placeholder="Nome"
          />
          {formState.errors.name && (
            <p className="text-red-400 text-sm">
              {formState.errors.name.message}
            </p>
          )}
          <Input
            {...register('email')}
            name="email"
            placeholder="E-mail"
          />
          {formState.errors.email && (
            <p className="text-red-400 text-sm">
              {formState.errors.email.message}
            </p>
          )}
          <Input
            {...register('password')}
            type="password"
            name="password"
            placeholder="Senha"
          />
          {formState.errors.password && (
            <p className="text-red-400 text-sm">
              {formState.errors.password.message}
            </p>
          )}

          <Button type="submit">Cadastrar</Button>
        </form>

        <Link to="/">Já tem uma conta? Entre agora</Link>
      </Content>
    </Container>
  );
}

export default SignUp;
