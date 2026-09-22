import { JsonPostRepository } from '../../repositories/post/json-post-repository';

import { postsTable } from './schemas';

import { drizzleDb } from '.';

void (async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.transaction(async objTransaction => {
      await objTransaction.delete(postsTable); // Isso limpa a base de dados
      if (posts.length > 0) {
        await objTransaction.insert(postsTable).values(posts);
      }
    });

    console.log();
    console.log(`${posts.length} posts foram salvos na base de dados.`);
    console.log();
  } catch (e) {
    console.log();
    console.log('Ocorreu um erro....');
    console.log();
    console.log(e);
    console.log();

    process.exit(1);
  }
})();
