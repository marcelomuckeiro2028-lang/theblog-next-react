import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

// (async () => {
//   await drizzleDb
//     .update(postsTable)
//     .set({
//       title: '2- Rotina matinal de pessoas altamente eficazes',
//       published: true,
//     })
//     .where(eq(postsTable.slug, 'rotina-matinal-de-pessoas-altamente-eficazes'));
// })();

(async () => {
  const allPosts = await drizzleDb.select().from(postsTable);
  console.log(allPosts);
})();
