'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

import { makePartialPublicPost, type PublicPost } from '../../dto/post/dto';
import { verifyLoginSession } from '../../lib/login/manager-login';
import { PostCreateSchema } from '../../lib/post/validation';
import { postRepository } from '../../repositories/post';
import { asyncDelay } from '../../utils/async-delay';
import { getZodErrorMessages } from '../../utils/getZodErrorMessages';
import { makeSlugFromText } from '../../utils/make-slug-from-text';

type CreatePostActionProps = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionProps,
  formData: FormData,
): Promise<CreatePostActionProps> {
  // TODO: Verificar se o usuário está logado
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  await asyncDelay(3000);

  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: ['Faça login em outra aba antes de salvar'],
    };
  }

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
