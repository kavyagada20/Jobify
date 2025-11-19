'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/auth/roles-types';

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
};

export default function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: RoleGuardProps) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch('/api/user/role');
        if (res.ok) {
          const data = await res.json();
          setRole(data.role);
        } else {
          router.push('/jobs');
        }
      } catch (error) {
        console.error('Error fetching role:', error);
        router.push('/jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return (
      fallback || (
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-2'>Access Denied</h2>
            <p className='text-muted-foreground'>
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

