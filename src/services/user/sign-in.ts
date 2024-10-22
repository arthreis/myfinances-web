import type { SignInCredentials } from '../../hooks/auth';
import api from '../api';

export async function userSignIn(data: SignInCredentials) {
  return await api.post('/sessions', data);
}

// export async function signIn(data: SignInCredentials) {
//   return await api.post('/sessions', data);
// }
// export async function signUp(goalId: string) {
//   await fetch('https://nlwpocket-backend.onrender.com/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       goalId,
//     }),
//   })
// }
