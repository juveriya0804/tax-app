import { prisma } from '../../lib/prisma';
import { Jurisdiction } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    companyName: string;
    jurisdiction: Jurisdiction;
    trn: string;
  }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw Object.assign(new Error('User already exists'), { status: 400 });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    // Create Organization and User in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          companyName: data.companyName,
          trn: data.trn,
          jurisdiction: data.jurisdiction,
        },
      });

      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          organizationId: org.id,
        },
      });

      return { user, org };
    });

    return result;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        organizationId: user.organizationId 
      }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    return token;
  }
}
