import clsx from 'clsx';

import { findAllPublicPostsCached } from '../../lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 0) return null;

  return (
    <div
      className={clsx('grid', 'grid-cols-1', 'mb-16', 'gap-8', 'sm:grid-cols-2', 'lg:grid-cols-3')}
    >
      {posts.slice(1).map(post => {
        if (!post.slug) {
          console.warn(`Post com id ${post.id} não tem slug`);
          return null; // ou redirecione para um fallback
        }
        const postLink = `/post/${post.slug}`;
        return (
          <div
            key={post.id}
            className={clsx(
              'flex',
              'flex-col',
              'overflow-hidden',
              'rounded-lg',
              'shadow-md',
              'mt-4',
            )}
          >
            {/* Container da imagem com altura fixa */}
            <div className={clsx('h-80', 'w-full', 'flex-shrink-0', '!mt-4', '!mb-2')}>
              <PostCoverImage
                linkProps={{ href: postLink }}
                imageProps={{
                  width: 1200,
                  height: 720,
                  src: post.coverImageUrl,
                  alt: post.title,
                  priority: post === posts[0],
                }}
              />
            </div>

            {/* Conteúdo do texto */}
            <div className='flex flex-1 flex-col px-4 pb-4 pt-6'>
              <PostSummary
                postLink={postLink}
                postHeading='h2'
                createdAt={post.createdAt}
                title={post.title}
                excerpt={post.excerpt}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
