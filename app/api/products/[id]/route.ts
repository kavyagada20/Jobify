import { NextResponse } from 'next/server';
import prisma from '@/utils/db';
import {
  productInputSchema,
  generateSlugFromName,
  ProductInput,
} from '@/lib/validators/product';
import { requireAdmin } from '@/lib/auth/roles';

async function buildUniqueSlug(base: string, currentId?: string) {
  let slug = base;
  let suffix = 1;

  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === currentId) break;
    slug = `${base}-${suffix++}`;
  }

  return slug;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    );
  }

  const existing = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
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
  const slug = await buildUniqueSlug(baseSlug, existing.id);

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      slug,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    );
  }

  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

