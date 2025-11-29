/**
 * Flight Service
 */
import { FlightRepository } from './flight.repository';
import { CreateFlightInput, UpdateFlightInput } from './flight.types';
import { NotFoundError } from '../../shared/utils/errorHandler';

export class FlightService {
  private repository: FlightRepository;

  constructor() {
    this.repository = new FlightRepository();
  }

  async getAllFlights() {
    return this.repository.findAll();
  }

  async getFlightById(id: string) {
    const flight = await this.repository.findById(id);
    if (!flight) {
      throw new NotFoundError('Flight not found');
    }
    return flight;
  }

  async createFlight(data: CreateFlightInput) {
    return this.repository.create(data);
  }

  async updateFlight(id: string, data: UpdateFlightInput) {
    const flight = await this.repository.findById(id);
    if (!flight) {
      throw new NotFoundError('Flight not found');
    }
    return this.repository.update(id, data);
  }

  async deleteFlight(id: string) {
    const flight = await this.repository.findById(id);
    if (!flight) {
      throw new NotFoundError('Flight not found');
    }
    return this.repository.delete(id);
  }
}
