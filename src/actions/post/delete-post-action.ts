'use server';

import { revalidateTag } from 'next/cache';

import { postRepository } from '../../repositories/post';
import { logColor } from '../../utils/log-color';

import type { PostModel } from '../../models/post/post-model';

export async function deletePostAction(id: string) {
  // TODO: checar login do usuário

  // TODO: REMOVER LINHAS ABAIXO

  logColor('' + id);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  let post: PostModel;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Erro desconhecido',
    };
  }
  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
