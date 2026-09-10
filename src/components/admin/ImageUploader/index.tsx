'use client';

import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';
import { uploadImageAction } from '../../../actions/upload/upload-image-action';
import { IMAGE_UPLOAD_MAX_SIZE } from '../../../lib/constants';
import { Button } from '../../Button';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpload, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Imagem muito grande. Max: ${readableMaxSize}KB.`);

      fileInput.value = '';
      return;
    }

    // TODO:  Criar a action para upload de arquivo
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        return;
      }

      toast.success(result.url);
    });

    fileInput.value = '';
  }
  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button onClick={() => handleChooseFile()} type='button'>
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      <input
        onChange={handleChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
      />
    </div>
  );
}
