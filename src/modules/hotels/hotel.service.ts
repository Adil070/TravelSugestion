/**
 * Hotel Service
 * Business logic for hotel management
 */
import { HotelRepository } from './hotel.repository';
import { CreateHotelInput, UpdateHotelInput } from './hotel.types';
import { NotFoundError } from '../../shared/utils/errorHandler';

export class HotelService {
  private repository: HotelRepository;

  constructor() {
    this.repository = new HotelRepository();
  }

  async getAllHotels() {
    return this.repository.findAll();
  }

  async getHotelById(id: string) {
    const hotel = await this.repository.findById(id);
    if (!hotel) {
      throw new NotFoundError('Hotel not found');
    }
    return hotel;
  }

  async createHotel(data: CreateHotelInput) {
    return this.repository.create(data);
  }

  async updateHotel(id: string, data: UpdateHotelInput) {
    const hotel = await this.repository.findById(id);
    if (!hotel) {
      throw new NotFoundError('Hotel not found');
    }
    return this.repository.update(id, data);
  }

  async deleteHotel(id: string) {
    const hotel = await this.repository.findById(id);
    if (!hotel) {
      throw new NotFoundError('Hotel not found');
    }
    return this.repository.delete(id);
  }
}
