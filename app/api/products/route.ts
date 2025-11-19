import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import {
  productInputSchema,
  generateSlugFromName,
  ProductInput,
} from '@/lib/validators/product';
import { requireAdmin } from '@/lib/auth/roles';

async function buildUniqueSlug(base: string) {
  let slug = base;
  let suffix = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix++}`;
  }

  return slug;
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    );
  }

  const payload = (await request.json()) as ProductInput;
  const parsed = productInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const baseSlug = generateSlugFromName(parsed.data.name);
  const slug = await buildUniqueSlug(baseSlug);

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      slug,
    },
  });

  return NextResponse.json(product, { status: 201 });
}

