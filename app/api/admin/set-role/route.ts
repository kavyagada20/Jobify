import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/utils/db';
import { getUserRole, UserRole } from '@/lib/auth/roles';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if current user is admin (optional - you can remove this if you want anyone to set roles)
    const currentRole = await getUserRole();
    // Uncomment the line below if you want only admins to set roles
    // if (currentRole !== UserRole.ADMIN) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const { clerkId, role } = await request.json();

    if (!clerkId || !role) {
      return NextResponse.json(
        { error: 'clerkId and role are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'user', 'guest'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, user, or guest' },
        { status: 400 }
      );
    }

    const profile = await prisma.userProfile.upsert({
      where: { clerkId },
      update: { role },
      create: {
        clerkId,
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${clerkId} role set to ${role}`,
      profile,
    });
  } catch (error) {
    console.error('Error setting role:', error);
    return NextResponse.json(
      { error: 'Failed to set role' },
      { status: 500 }
    );
  }
}

