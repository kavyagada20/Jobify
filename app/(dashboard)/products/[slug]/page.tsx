import Image from 'next/image';
import { notFound } from 'next/navigation';

import prisma from '@/utils/db';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return {};

  return {
    title: `${product.name} · Jobify Products`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className='space-y-8'>
      <header className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <Badge variant='secondary'>{product.category}</Badge>
          <Badge variant='outline'>{product.status}</Badge>
        </div>
        <div>
          <h1 className='text-4xl font-semibold'>{product.name}</h1>
          <p className='text-muted-foreground'>{product.description}</p>
        </div>
      </header>

      <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Product Overview</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              {product.description}
            </p>
            <div className='grid gap-3 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Price</span>
                <span className='font-medium'>
                  {currencyFormatter.format(product.price)} / month
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Company</span>
                <span className='font-medium'>{product.company}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Status</span>
                <span className='font-medium capitalize'>
                  {product.status.replace('-', ' ')}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Last updated</span>
                <span className='font-medium'>
                  {new Date(product.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>Product Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className='w-full rounded-lg bg-muted object-cover'
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

