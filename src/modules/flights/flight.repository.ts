/**
 * Flight Repository
 */
import { prisma } from '../../config/db';
import { CreateFlightInput, UpdateFlightInput } from './flight.types';

export class FlightRepository {
  async findAll() {
    return prisma.flight.findMany({
      orderBy: { departureTime: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.flight.findUnique({
      where: { id },
    });
  }

  async create(data: CreateFlightInput) {
    return prisma.flight.create({
      data: {
        ...data,
        departureTime: new Date(data.departureTime),
        arrivalTime: new Date(data.arrivalTime),
      },
    });
  }

  async update(id: string, data: UpdateFlightInput) {
    return prisma.flight.update({
      where: { id },
      data: {
        ...data,
        ...(data.departureTime && { departureTime: new Date(data.departureTime) }),
        ...(data.arrivalTime && { arrivalTime: new Date(data.arrivalTime) }),
      },
    });
  }

  async delete(id: string) {
    return prisma.flight.delete({
      where: { id },
    });
  }
}
