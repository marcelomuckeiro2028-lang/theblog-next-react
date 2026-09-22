import Image from 'next/image';
import { notFound } from 'next/navigation';

import { findPublicPostBySlugCached } from '../../lib/post/queries/public';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';
import { SafeMarkdown } from '../SafeMarkdowm';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);

  if (!post) notFound();

  return (
    <article>
      <header className='group flex flex-col gap-4 mb-4'>
        {post.coverImageUrl && (
          <Image
            className='rounded-xl  mt-4 mb-4'
            src={post.coverImageUrl}
            width={1200}
            height={720}
            alt={post.title}
            priority={true}
          />
        )}

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
