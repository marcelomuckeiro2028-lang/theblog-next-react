import { cache } from 'react';

import { postRepository } from '../../../repositories/post';

export const findPostByIdAdmin = cache(async (id: string) => {
  return postRepository.findById(id);
});

export const findAllPostAdmin = cache(async () => {
  return postRepository.findAll();
});
