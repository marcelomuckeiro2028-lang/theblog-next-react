import { drizzleDb } from '../../db/drizzle';
import { postsTable } from '../../db/drizzle/schemas';
import { PostModel } from '../../models/post/post-model';
import { PostRepository } from './post-repository';
import { logColor } from '../../utils/log-color';
import { SIMULATE_WAIL_IN_MS } from '../../lib/constants';
import { asyncDelay } from '../../utils/async-delay';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIL_IN_MS, true);
    logColor('findAllPublic', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(postsTable.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIL_IN_MS, true);
    logColor('findBySlugPublic', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIL_IN_MS, true);
    logColor('findAll', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIL_IN_MS, true);
    logColor('findById', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado para ID');

    return post;
  }
}

// (async () => {
//   // como-a-tecnologia-impacta-nosso-bem-estar false
//   // os-desafios-do-trabalho-remoto-moderno true

//   // 9eb8b7ac-2b48-4835-880a-a1c798e1a595 true
//   // 6b204dab-2312-4525-820a-a0463560835f false

//   const repo = new DrizzlePostRepository();
//   // const posts = await repo.findAllPublic();
//   // posts.forEach(post => console.log(post.id, post.published));

//   const post = await repo.findBySlugPublic('os-desafios-do-trabalho-remoto-moderno');
//   console.log(post);
// })();
