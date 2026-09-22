import { Suspense } from 'react';

import { PostFeatured } from '../components/PostFeatured';
import { PostList } from '../components/PostsList';
import { SpinLoader } from '../components/SpinLoder';

export const dynamic = 'force-static';

export default function HomePage() {
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
