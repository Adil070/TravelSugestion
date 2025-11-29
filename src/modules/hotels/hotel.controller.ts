/**
 * Hotel Controller
 * Handles HTTP requests for hotel management
 */
import { Request, Response, NextFunction } from 'express';
import { HotelService } from './hotel.service';
import { createHotelSchema, updateHotelSchema } from './hotel.types';
import { ApiResponse } from '../../shared/utils/apiResponse';
import { HTTP_STATUS } from '../../shared/constants/httpStatus';

export class HotelController {
  private service: HotelService;

  constructor() {
    this.service = new HotelService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotels = await this.service.getAllHotels();
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Hotels retrieved', hotels);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotel = await this.service.getHotelById(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Hotel retrieved', hotel);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createHotelSchema.parse(req.body);
      const hotel = await this.service.createHotel(input);
      return ApiResponse.success(res, HTTP_STATUS.CREATED, 'Hotel created', hotel);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = updateHotelSchema.parse(req.body);
      const hotel = await this.service.updateHotel(req.params.id, input);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Hotel updated', hotel);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteHotel(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.NO_CONTENT, 'Hotel deleted');
    } catch (error) {
      next(error);
    }
  };
}
