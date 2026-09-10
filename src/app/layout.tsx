import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { MenuAdmin } from '../components/admin/MenuAdmin';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Este é um blog com next.js',
    template: '%s | The Blog',
  },
  description: 'Essa seria a descrição da minha página',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

// ✅ Apenas use React.ReactNode
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-br'>
      <body className='min-h-full flex flex-col'>
        <Container>
          <Header />
          <MenuAdmin />
          {children}
          <Footer />
        </Container>

        <ToastContainer />
      </body>
    </html>
  );
}
