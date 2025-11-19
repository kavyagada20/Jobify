import Link from 'next/link';

import PageContainer from './PageContainer';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t bg-muted/40'>
      <PageContainer className='flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
        <p>&copy; {year} Jobify Tracking App. All rights reserved.</p>
        <div className='flex flex-wrap items-center gap-4'>
          <Link href='/privacy'>Privacy</Link>
          <Link href='/terms'>Terms</Link>
          <Link href='https://github.com/arnobt78/Job-Tracking-App--NextJS' target='_blank'>
            GitHub
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
}

