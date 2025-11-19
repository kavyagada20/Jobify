/**
 * Utility script to set a user as admin
 * Usage: node scripts/set-admin.js <clerkUserId>
 * 
 * Example: node scripts/set-admin.js user_2yTTqgm2E3PfnFJKwdpp0OXRoky
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setAdmin(clerkId) {
  if (!clerkId) {
    console.error('Please provide a Clerk user ID');
    console.log('Usage: node scripts/set-admin.js <clerkUserId>');
    process.exit(1);
  }

  try {
    const profile = await prisma.userProfile.upsert({
      where: { clerkId },
      update: { role: 'admin' },
      create: {
        clerkId,
        role: 'admin',
      },
    });

    console.log(`✅ User ${clerkId} is now an admin`);
    console.log('Profile:', profile);
  } catch (error) {
    console.error('Error setting admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const clerkId = process.argv[2];
setAdmin(clerkId);

