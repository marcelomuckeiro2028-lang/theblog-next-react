'use client';

import { Bounce, ToastContainer } from 'react-toastify';
import { postRepository } from '../../repositories/post/index';

export function ToastifyContainer() {
  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Bounce}
    />
  );
}
