'use client';

import { useEffect } from 'react';

import ErrorMessage from '../components/ErrorMessage';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content='Ocorreu um erro do qual nossa aplicação não conseguiu se recuperar. Tente novamente mas tarde.'
    />
  );
}
