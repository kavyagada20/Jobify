import { PropsWithChildren, ReactNode } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

type LayoutShellProps = PropsWithChildren<{
  mainClassName?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  sidebar?: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
}>;

export default function LayoutShell({
  children,
  mainClassName,
  sidebarClassName,
  contentClassName,
  sidebar = <Sidebar />,
  navbar = <Navbar />,
  footer,
}: LayoutShellProps) {
  return (
    <main className={cn('grid lg:grid-cols-5', mainClassName)}>
      <div
        className={cn(
          'hidden lg:block lg:col-span-1 lg:min-h-screen',
          sidebarClassName
        )}
      >
        {sidebar}
      </div>
      <div className='flex flex-col lg:col-span-4'>
        {navbar}
        <div
          className={cn(
            'flex-1 py-16 px-4 sm:px-8 lg:px-16',
            contentClassName
          )}
        >
          {children}
        </div>
        {footer}
      </div>
    </main>
  );
}

