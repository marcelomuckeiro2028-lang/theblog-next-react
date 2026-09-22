import { type Metadata } from 'next';
import { Suspense } from 'react';

import PostsListAdmin from '../../../actions/PostsListAdmin';
import { SpinLoader } from '../../../components/SpinLoder';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <PostsListAdmin />
    </Suspense>
  );
}
