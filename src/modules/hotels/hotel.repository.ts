/**
 * Hotel Repository
 * Database operations for hotels
 */
import { prisma } from '../../config/db';
import { CreateHotelInput, UpdateHotelInput } from './hotel.types';

export class HotelRepository {
  async findAll() {
    return prisma.hotel.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.hotel.findUnique({
      where: { id },
    });
  }

  async create(data: CreateHotelInput) {
    return prisma.hotel.create({
      data,
    });
  }

  async update(id: string, data: UpdateHotelInput) {
    return prisma.hotel.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.hotel.delete({
      where: { id },
    });
  }
}
