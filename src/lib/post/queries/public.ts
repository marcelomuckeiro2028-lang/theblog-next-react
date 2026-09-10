import { unstable_cache } from 'next/cache';
import { postRepository } from '../../../repositories/post';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export const findAllPublicPostsCached = cache(async () => await postRepository.findAllPublic());

export const findPublicPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlugPublic(slug).catch(() => undefined);

  if (!post) notFound();

  return post;
});
