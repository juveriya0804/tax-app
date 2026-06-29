import { prisma } from './src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'admin@taxflow.com';
  const newPassword = 'password123';
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: { passwordHash },
  });
  console.log('Password reset successfully for', user.email);
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
