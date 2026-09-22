import { notFound } from 'next/navigation';

import { ManagePostForm } from '../../../../components/admin/ManagePostform';
import { makePublicPostFromDb } from '../../../../dto/post/dto';
import { findPostByIdAdmin } from '../../../../lib/post/queries/admin';

import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar um post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </div>
  );
}
