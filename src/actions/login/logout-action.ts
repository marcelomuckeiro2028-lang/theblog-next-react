'use server';

import { redirect } from 'next/navigation';

import { deleteLoginSession } from '../../lib/login/manager-login';

export async function logoutAction() {
  await deleteLoginSession();
  redirect('/');
}
