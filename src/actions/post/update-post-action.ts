'use server';

import { revalidateTag } from 'next/cache';

import { makePartialPublicPost, makePublicPostFromDb, type PublicPost } from '../../dto/post/dto';
import { PostUpdateSchema } from '../../lib/post/validation';
import { postRepository } from '../../repositories/post';
import { asyncDelay } from '../../utils/async-delay';
import { getZodErrorMessages } from '../../utils/getZodErrorMessages';
import { makeRandomString } from '../../utils/make-random-string';

type UpdatePostActionProps = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionProps,
  formData: FormData,
): Promise<UpdatePostActionProps> {
  // TODO: Verificar se o usuário está logado

  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id');

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Dados inválido'],
    };
  }

  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  try {
    const post = await postRepository.update(id, newPost);

    revalidateTag('posts');
    revalidateTag(`post-${post.slug}`);

    return {
      formState: makePublicPostFromDb(post),
      errors: [],
      success: makeRandomString(),
    };
  } catch (e: unknown) {
    const messageError = e instanceof Error ? e.message : 'Erro desconhecido';

    return {
      formState: makePartialPublicPost(formDataObj),
      errors: [messageError],
    };
  }
}
