import { prisma } from './src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'admin@taxflow.com';
  const password = 'password123'; // Default password

  console.log(`Checking if user ${email} exists...`);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) {
    console.log('User already exists! Updating password just in case...');
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { passwordHash }
    });
    console.log('Password updated.');
    return;
  }

  console.log('Creating organization and user...');
  const passwordHash = await bcrypt.hash(password, 10);

  const org = await prisma.organization.create({
    data: {
      companyName: 'Taxflow Admin',
      trn: '123456789012345',
      jurisdiction: 'ONSHORE',
      users: {
        create: {
          email,
          passwordHash
        }
      }
    }
  });

  console.log(`Successfully created user: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
