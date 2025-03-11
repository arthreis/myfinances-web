import type { SignInCredentials } from '@/hooks/auth';
import api from '../api';

export async function userSignIn(data: SignInCredentials) {
  return await api.post('/sessions', data);
}
