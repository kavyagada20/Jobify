import Link from 'next/link';

import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    title: 'Unified Dashboard',
    description:
      'Track every job application, status update, and interview reminder in one responsive dashboard.',
  },
  {
    title: 'Smart Analytics',
    description:
      'Visualize your pipeline with stats, charts, and insights that surface bottlenecks instantly.',
  },
  {
    title: 'Collaboration Ready',
    description:
      'Share progress with mentors or friends using secure links and role-based permissions.',
  },
];

const companyStats = [
  { name: 'NovaTech Labs', openRoles: 18, hiresThisMonth: 6 },
  { name: 'Orbit Finance', openRoles: 12, hiresThisMonth: 3 },
  { name: 'PixelForge Studios', openRoles: 9, hiresThisMonth: 4 },
  { name: 'Helios Health', openRoles: 21, hiresThisMonth: 8 },
];

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className='bg-background text-foreground'>
        <section className='border-b bg-muted/20'>
          <PageContainer className='grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-[1fr,400px]'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-primary'>
                Organize every opportunity
              </p>
              <h1 className='mt-3 text-4xl font-bold leading-tight md:text-6xl'>
                A consistent UI for your job tracking workflow
              </h1>
              <p className='mt-6 max-w-2xl text-lg text-muted-foreground'>
                Jobify keeps your applications, interview notes, and offer
                stages in sync across devices. Add roles, update statuses, and
                review analytics with a single, reusable layout that feels great
                everywhere.
              </p>
              <div className='mt-8 flex flex-wrap gap-4'>
                <Button asChild size='lg'>
                  <Link href='/add-job'>Add Your Next Role</Link>
                </Button>
                <Button asChild variant='ghost' size='lg'>
                  <Link href='/jobs'>View Dashboard</Link>
                </Button>
              </div>
            </div>
            <img
              src='/main.svg'
              alt='Job tracking dashboard preview'
              className='mx-auto hidden max-w-full lg:block'
              width={400}
              height={400}
            />
          </PageContainer>
        </section>

        <section className='py-16'>
          <PageContainer>
            <div className='flex flex-col gap-4 text-center'>
              <h2 className='text-3xl font-semibold'>Why teams choose Jobify</h2>
              <p className='text-muted-foreground'>
                A consistent layout, intuitive navigation bar, and shared
                components keep every page polished and familiar.
              </p>
            </div>
            <div className='mt-10 grid gap-6 md:grid-cols-3'>
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className='rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
                >
                  <h3 className='text-xl font-semibold'>{item.title}</h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        <section className='border-y bg-muted/30 py-16'>
          <PageContainer>
            <div className='flex flex-col gap-3 text-center'>
              <p className='text-sm uppercase tracking-wide text-primary'>
                Company snapshots
              </p>
              <h2 className='text-3xl font-semibold'>Live hiring signals</h2>
              <p className='text-muted-foreground'>
                Here’s a glimpse of the companies actively hiring on Jobify.
              </p>
            </div>
            <div className='mt-10 grid gap-6 md:grid-cols-2'>
              {companyStats.map((company) => (
                <div
                  key={company.name}
                  className='flex items-center justify-between rounded-2xl border bg-background p-6 shadow-sm'
                >
                  <div>
                    <p className='text-lg font-semibold'>{company.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {company.hiresThisMonth} hires this month
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-3xl font-bold'>{company.openRoles}</p>
                    <span className='text-xs uppercase tracking-wide text-muted-foreground'>
                      open roles
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
