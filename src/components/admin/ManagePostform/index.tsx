'use client';

import { useState } from 'react';
import { Button } from '../../Button';
import { InputCheckbox } from '../../InputCheckBox';
import { InputText } from '../../InputText';
import { MarkdownEditor } from '../../MarkdownEditor';
import { ImageUploader } from '../ImageUploader';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('');
  return (
    <form action=''>
      <div className='flex flex-col gap-6'>
        <InputText labelText='Nome' placeholder='Digite seu nome' />

        <ImageUploader />

        <InputText labelText='Sobrenome' placeholder='Digite seu sobrenome' />

        <InputCheckbox labelText='Sobrenome' />

        <InputText
          disabled
          labelText='Input'
          placeholder='Input desativado'
          defaultValue='Hello world!!!'
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <InputText
          disabled
          labelText='Input'
          placeholder='Input desativado'
          defaultValue='Hello world!!!'
        />

        <InputText
          labelText='Input'
          placeholder='Input desativado'
          defaultValue='Hello world!!!'
          readOnly
        />
      </div>

      <div>
        <Button type='submit' size='md' className='w-full mt-8'>
          Enviar
        </Button>
      </div>
    </form>
  );
}
