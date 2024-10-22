import type { SignUpForm } from '../../pages/SignUp';
import api from '../../services/api';

export async function userSignUp(data: SignUpForm) {
  await api.post('/users', data);
}
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
