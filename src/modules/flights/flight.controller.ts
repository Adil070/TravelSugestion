/**
 * Flight Controller
 */
import { Request, Response, NextFunction } from 'express';
import { FlightService } from './flight.service';
import { createFlightSchema, updateFlightSchema } from './flight.types';
import { ApiResponse } from '../../shared/utils/apiResponse';
import { HTTP_STATUS } from '../../shared/constants/httpStatus';

export class FlightController {
  private service: FlightService;

  constructor() {
    this.service = new FlightService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flights = await this.service.getAllFlights();
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Flights retrieved', flights);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flight = await this.service.getFlightById(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Flight retrieved', flight);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createFlightSchema.parse(req.body);
      const flight = await this.service.createFlight(input);
      return ApiResponse.success(res, HTTP_STATUS.CREATED, 'Flight created', flight);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = updateFlightSchema.parse(req.body);
      const flight = await this.service.updateFlight(req.params.id, input);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Flight updated', flight);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteFlight(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.NO_CONTENT, 'Flight deleted');
    } catch (error) {
      next(error);
    }
  };
}
