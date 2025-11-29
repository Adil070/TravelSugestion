/**
 * Auth Repository
 * Database operations for authentication
 */
import { prisma } from '../../config/db';
import { SignupInput } from './auth.types';

export class AuthRepository {
  async createUser(data: SignupInput & { password: string }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
