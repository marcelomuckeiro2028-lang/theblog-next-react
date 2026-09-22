import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no mínimo, 3 caracteres')
    .max(120, 'Título deve ter um máximo de 120 caracteres'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo é obrigatório')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Autor precisa de um mínimo de 4 caracteres')
    .max(100, 'Nome do autor não deve ter mais que 100 caracteres'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto precisa de um mínimo de 3 caracteres')
    .max(200, 'Excerto não deve ter mais que 200 caracteres'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'URL da capa deve ser uma URL ou caminho para imagem',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

// PostCreateSchema: igual ao base por enquanto
export const PostCreateSchema = PostBaseSchema;

// PostUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválido'),
});

const obj = {
  $ACTION_REF_1: '',
  '$ACTION_1:0': '{"id":"60274ec47b95b579c4f41e9dbfed5f17e18f831054","bound":"$@1"}',
  '$ACTION_1:1':
    '[{"formState":{"id":"afa086e4-53e4-492d-acf2-7c2966d83fcd","slug":"dicas-para-manter-a-saude-mental-em-dia","title":"Dicas para manter a saúde mental em dia","excerpt":"Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.","author":"Marina Duarte","content":"Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.","coverImageUrl":"/images/bryen_6.png","createdAt":"2025-04-07T00:24:38.616Z","published":true},"errors":[]}]',
  $ACTION_KEY: 'k2975572431',
  id: 'afa086e4-53e4-492d-acf2-7c2966d83fcd',
  slug: 'dicas-para-manter-a-saude-mental-em-dia',
  author: 'Marina Duarte',
  title: 'Dicas para manter a saúde mental em dia',
  excerpt:
    'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
  content:
    'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
  file: {
    size: 0,
    type: 'application/octet-stream',
    name: 'undefined',
    lastModified: 1789602452658,
  },
  coverImageUrl: 'images/bryen_6.png',
  published: 'on',
};

const zodParsedObj = PostCreateSchema.safeParse(obj);

if (!zodParsedObj.success) {
  console.log(zodParsedObj.error.format());
}
