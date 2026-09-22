import { notFound } from 'next/navigation';
import { cache } from 'react';

import { postRepository } from '../../../repositories/post';

export const findAllPublicPostsCached = cache(async () => await postRepository.findAllPublic());

export const findPublicPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlugPublic(slug).catch(() => undefined);

  if (!post) notFound();

  return post;
});
