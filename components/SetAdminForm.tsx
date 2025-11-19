'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/lib/auth/roles-types';

type SetAdminFormProps = {
  currentUserId: string;
  currentRole: UserRole;
};

export default function SetAdminForm({
  currentUserId,
  currentRole,
}: SetAdminFormProps) {
  const [clerkId, setClerkId] = useState(currentUserId);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/set-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clerkId, role: 'admin' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to set admin role');
      }

      toast({
        description: `✅ User ${clerkId} is now an admin!`,
      });
      router.refresh();
    } catch (error) {
      toast({
        description:
          error instanceof Error ? error.message : 'Failed to set admin role',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='text-sm font-medium mb-2 block'>
          Clerk User ID
        </label>
        <Input
          value={clerkId}
          onChange={(e) => setClerkId(e.target.value)}
          placeholder='user_xxxxx'
          required
        />
        <p className='text-xs text-muted-foreground mt-1'>
          Your current ID is pre-filled. You can change it to set another user
          as admin.
        </p>
      </div>
      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading ? 'Setting...' : 'Set as Admin'}
      </Button>
      {currentRole === UserRole.ADMIN && (
        <p className='text-xs text-green-600 dark:text-green-400'>
          ✓ You are already an admin
        </p>
      )}
    </form>
  );
}

