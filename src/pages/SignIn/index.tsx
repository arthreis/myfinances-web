import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock } from 'react-icons/fi';

// import {logoImg} from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Form } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSignIn } from '../../services/user/sign-in';
import * as C from '../../components';
import { useTheme } from '../../hooks/theme';

// const schema = Yup.object().shape({
//   email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
//   password: Yup.string().min(6, 'No mínimo 6 dígitos').required(),
// });
const schema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

type SignInForm = Yup.InferType<typeof schema>;

function SignIn(): React.JSX.Element {
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });

  async function handleSignIn(data: SignInForm) {
    await signIn({
      email: data.email,
      password: data.password,
    });

    toast.success('Login realizado com sucesso!');

    reset();

    navigate('/dashboard');
  }

  // useEffect(() => {
  //   signOut();
  // }, [signOut]);

  // async function handleSubmit2(formData: SignInFormData): Promise<void> {
  //   try {
  //     const schema = Yup.object().shape({
  //       email: Yup.string()
  //         .email('Digite um e-mail válido')
  //         .required('E-mail obrigatório'),
  //       password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  //     });

  //     await schema.validate(formData, {
  //       abortEarly: false,
  //     });

  //     await signIn({
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     navigate('/dashboard');
  //   } catch (err: any) {
  //     if (err instanceof Yup.ValidationError) {
  //       const validationErrors = getValidationErrors(err);
  //       // formRef?.current?.setErrors(validationErrors);
  //     } else if (err instanceof AxiosError) {
  //       if (err.response) {
  //         if (err.response.status === 401) {
  //           toast.error('Usuário e/ou senha inválidos');
  //           console.error('Error: ', err.message);
  //         }
  //       } else {
  //         toast.error(err.message);
  //         console.error('Error: ', err.message);
  //       }
  //     }
  //   }
  // }
  const { theme } = useTheme();

  return (
    <Container>
      <Content>
        <C.Logo color={theme.colors.primary} />

        <Form onSubmit={handleSubmit(handleSignIn)}>
          {/* <Form ref={formRef} onSubmit={handleSubmit}> */}
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
