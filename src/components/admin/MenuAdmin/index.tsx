'use client';

import clsx from 'clsx';
import { CircleXIcon, FileTextIcon, HouseIcon, MenuIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    setIsOpen(false);
  }, [pathname]);

  const navclasses = clsx(
    'bg-slate-900',
    'flex ',
    'items-center',
    'mb-8',
    'rounded-lg',
    'p-2',
    'gap-1',
    'sm:flex-row sm:flex-wrap',
    'sm:overflow-visible sm:h-auto',
    'transition-all duration-300',
    'w-full',
    'flex-wrap',
    // Mobile: coluna quando fechado, linha quando aberto
    'sm:flex-row', // Desktop sempre em linha
    !isOpen ? 'h-10 overflow-hidden' : 'max-h-96',
    'sm:overflow-visible sm:h-auto',
  );

  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'transition-colors',
    'hover:bg-slate-800',
    'rounded-lg',
    'text-slate-100',
    'h-10',
    'whitespace-nowrap', // Evita que o texto quebre
  );

  const openCloseButtonClasses = clsx(linkClasses, 'text-blue-200 italic', 'sm:hidden');

  return (
    <nav className={navclasses}>
      <button onClick={() => setIsOpen(s => !s)} className={openCloseButtonClasses}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar Post
      </Link>
    </nav>
  );
}
