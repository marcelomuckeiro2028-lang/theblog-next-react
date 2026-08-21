import { findAllPublicPostsCached } from '@/src/lib/post/queries';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostList() {
  const posts = await findAllPublicPostsCached();

  return (
    <div className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col overflow-hidden rounded-lg shadow-md'>
            {/* Container da imagem com altura fixa */}
            <div className='h-80 w-full flex-shrink-0'>
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
            <div className='flex flex-1 flex-col p-4'>
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
