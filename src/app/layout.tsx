import type { Metadata } from 'next';
import './globals.css';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
