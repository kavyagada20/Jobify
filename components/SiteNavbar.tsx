import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import PageContainer from './PageContainer';
import ThemeToggle from './ThemeToggle';

const publicNavLinks = [
  { href: '/', label: 'Home' },
];

const authNavLinks = [
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/add-job', label: 'Add Job' },
  { href: '/stats', label: 'Stats' },
  { href: '/admin', label: 'Admin' },
];

export default function SiteNavbar() {
  return (
    <header className='border-b bg-background/80 backdrop-blur'>
      <PageContainer className='flex flex-wrap items-center justify-between gap-4 py-4'>
        <Link href='/' className='flex items-center gap-2 text-xl font-semibold'>
          <img src='/logo.svg' alt='Jobify logo' className='h-8 w-auto' />
          <span className='hidden sm:inline'>Jobify</span>
        </Link>
        <nav className='flex flex-1 items-center justify-center gap-6 text-sm font-medium max-md:hidden'>
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-muted-foreground transition hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
          <SignedIn>
            {authNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-muted-foreground transition hover:text-foreground'
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>
        </nav>
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <Button asChild size='sm'>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </PageContainer>
    </header>
  );
}

