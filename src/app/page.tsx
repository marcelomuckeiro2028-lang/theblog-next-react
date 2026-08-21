import { SpinLoader } from '../components/SpinLoder';
import { Suspense } from 'react';
import { PostList } from '../components/PostsList';

import { PostFeatured } from '../components/PostFeatured';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
      </Suspense>

      {/* <ul className='space-y-2 mb-8'>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`} className='text-blue-600 hover:underline'>
              {post.title}
            </Link>
          </li>
        ))}
      </ul> */}

      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostList />
      </Suspense>
    </>
  );
}
