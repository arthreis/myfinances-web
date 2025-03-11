import type { SignUpForm } from '@/pages/SignUp';
import api from '@/services/api';

export async function userSignUp(data: SignUpForm) {
  await api.post('/users', data);
}
