import Link from 'next/link';

import prisma from '@/utils/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserRole, UserRole } from '@/lib/auth/roles';
import AdminProductControls from '@/components/AdminProductControls';

const statusVariants: Record<string, string> = {
  'in-stock': 'bg-green-100 text-green-700',
  backorder: 'bg-yellow-100 text-yellow-700',
  discontinued: 'bg-red-100 text-red-700',
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const userRole = await getUserRole();
  const isAdmin = userRole === UserRole.ADMIN;

  return (
    <section className='space-y-8'>
      <header className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-sm uppercase tracking-wide text-primary'>
            Product catalog
          </p>
          <h1 className='text-3xl font-semibold'>Dashboard Products</h1>
          <p className='text-muted-foreground'>
            Browse every product powering your application management workflow.
            {!isAdmin && (
              <span className='block mt-1 text-xs'>
                (View only - Admin access required to manage products)
              </span>
            )}
          </p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link href='/admin/products/new'>Add New Product</Link>
          </Button>
        )}
      </header>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {products.map((product) => (
          <Card key={product.id} className='flex flex-col'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl'>{product.name}</CardTitle>
                <Badge className={statusVariants[product.status] || ''}>
                  {product.status}
                </Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                {product.company} · {currencyFormatter.format(product.price)}/mo
              </p>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col justify-between gap-4'>
              <p className='text-sm text-muted-foreground'>
                {product.description}
              </p>
              <div className='flex items-center justify-between text-xs text-muted-foreground'>
                <span>
                  Updated {new Date(product.updatedAt).toLocaleDateString()}
                </span>
                <div className='flex gap-2'>
                  <Button asChild size='sm' variant='outline'>
                    <Link href={`/products/${product.slug}`}>View details</Link>
                  </Button>
                  {isAdmin && (
                    <AdminProductControls productId={product.id} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

