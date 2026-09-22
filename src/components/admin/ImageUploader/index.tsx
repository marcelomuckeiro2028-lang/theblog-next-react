'use client';

import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

import { uploadImageAction } from '../../../actions/upload/upload-image-action';
import { IMAGE_UPLOAD_MAX_SIZE } from '../../../lib/constants';
import { Button } from '../../Button';

type ImageUploaderProps = {
  disabled?: boolean;
};
export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUpload, startTransition] = useTransition();
  // eslint-disable-next-line
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Imagem muito grande. Max: ${readableMaxSize}KB.`);

      fileInput.value = '';
      setImgUrl('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Imagem inválida');
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
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.success(result.url);
    });

    fileInput.value = '';
  }
  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button onClick={() => handleChooseFile()} type='button' disabled={isUpload || disabled}>
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <strong>URL:</strong> {imgUrl}
          </p>
          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} alt='Imagem da pasta uploads' />
        </div>
      )}
      <input
        onChange={handleChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        disabled={isUpload || disabled}
      />
    </div>
  );
}
