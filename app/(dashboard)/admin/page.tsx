import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/utils/db';
import { getUserRole, UserRole } from '@/lib/auth/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SetAdminForm from '@/components/SetAdminForm';

export default async function AdminPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  const role = await getUserRole();
  let profile = null;
  try {
    profile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
  }

  return (
    <section className='space-y-8'>
      <header>
        <h1 className='text-3xl font-semibold'>Admin Panel</h1>
        <p className='text-muted-foreground'>
          Manage user roles and view your account information
        </p>
      </header>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Your Account Info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Clerk User ID</p>
              <p className='font-mono text-sm break-all bg-muted p-2 rounded mt-1'>
                {userId}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Current Role</p>
              <p className='text-lg font-semibold capitalize mt-1'>{role}</p>
            </div>
            {profile && (
              <div>
                <p className='text-sm text-muted-foreground'>Profile Created</p>
                <p className='text-sm mt-1'>
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Set Admin Role</CardTitle>
          </CardHeader>
          <CardContent>
            <SetAdminForm currentUserId={userId} currentRole={role} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Set Admin Role</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <h3 className='font-semibold'>Method 1: Use the form above</h3>
            <p className='text-sm text-muted-foreground'>
              Enter your Clerk User ID and click "Set as Admin"
            </p>
          </div>
          <div className='space-y-2'>
            <h3 className='font-semibold'>Method 2: Use the command line</h3>
            <p className='text-sm text-muted-foreground mb-2'>
              Run this command in your terminal:
            </p>
            <code className='block bg-muted p-3 rounded text-sm break-all'>
              DATABASE_URL='file:./prisma/prisma/dev.db' node scripts/set-admin.js{' '}
              {userId}
            </code>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

