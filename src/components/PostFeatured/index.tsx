import { findAllPublicPostsCached } from '../../lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const [post] = await findAllPublicPostsCached();

  if (!post) {
    return <ErrorMessage contentTitle={'Erro '} content='Vamos criar alguns posts' />;
  }

  const postLink = `/post/${post.slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />

      <PostSummary
        postLink={`/post/${post.slug}`}
        postHeading='h1'
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        title={post.title}
      />
    </section>
  );
}
