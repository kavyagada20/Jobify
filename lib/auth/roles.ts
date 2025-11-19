import 'server-only';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/utils/db';
import { redirect } from 'next/navigation';
import { UserRole } from './roles-types';

// Re-export UserRole for server components
export { UserRole } from './roles-types';

export async function getUserRole(): Promise<UserRole> {
  const { userId } = await auth();
  if (!userId) {
    return UserRole.GUEST;
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) {
      // Create default user profile if it doesn't exist
      const newProfile = await prisma.userProfile.create({
        data: {
          clerkId: userId,
          role: UserRole.USER,
        },
      });
      return newProfile.role as UserRole;
    }

    return profile.role as UserRole;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return UserRole.USER; // Default to USER on error
  }
}

export async function requireAuth(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    redirect('/');
  }
  return userId;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<UserRole> {
  const userId = await requireAuth();
  const role = await getUserRole();

  if (!allowedRoles.includes(role)) {
    redirect('/jobs'); // Redirect unauthorized users
  }

  return role;
}

export async function requireAdmin(): Promise<UserRole> {
  return requireRole([UserRole.ADMIN]);
}

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

export function canManageProducts(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

export function canViewProducts(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.USER;
}

