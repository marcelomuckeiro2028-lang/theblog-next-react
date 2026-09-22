'use server';

import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOAD_MAX_SIZE,
} from '../../lib/constants';
import { asyncDelay } from '../../utils/async-delay';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  // TODO: Remover delay
  await asyncDelay(5000, true);

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: 'Árquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = path.extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = path.resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIRECTORY);
  await mkdir(uploadFullPath, { recursive: true });

  // JS <-  bytes -> Node -> Salvar
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = path.resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);
  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;

  // TOD0: Envia o arquivo
  return makeResult({ url });
}
