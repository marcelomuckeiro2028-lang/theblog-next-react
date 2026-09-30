'use server';

import { redirect } from 'next/navigation';

import { createLoginSession, verifyPassword } from '../../lib/login/manager-login';
import { asyncDelay } from '../../utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginAction(_state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login not allowed',
    };
  }
  await asyncDelay(3000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  // Dados que o usuário digitou no form
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const username = formData.get('username')?.toString().trim() || '';
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    };
  }

  // Aqui eu checaria se o usuário existe no base de dados
  const isUserNameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASSWORD || '');

  if (!isUserNameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
