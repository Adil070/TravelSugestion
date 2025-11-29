/**
 * Activity Repository
 */
import { prisma } from '../../config/db';
import { CreateActivityInput, UpdateActivityInput } from './activity.types';

export class ActivityRepository {
  async findAll() {
    return prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.activity.findUnique({
      where: { id },
    });
  }

  async create(data: CreateActivityInput) {
    return prisma.activity.create({
      data,
    });
  }

  async update(id: string, data: UpdateActivityInput) {
    return prisma.activity.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.activity.delete({
      where: { id },
    });
  }
}
