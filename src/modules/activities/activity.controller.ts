/**
 * Activity Controller
 */
import { Request, Response, NextFunction } from 'express';
import { ActivityService } from './activity.service';
import { createActivitySchema, updateActivitySchema } from './activity.types';
import { ApiResponse } from '../../shared/utils/apiResponse';
import { HTTP_STATUS } from '../../shared/constants/httpStatus';

export class ActivityController {
  private service: ActivityService;

  constructor() {
    this.service = new ActivityService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activities = await this.service.getAllActivities();
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Activities retrieved', activities);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activity = await this.service.getActivityById(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Activity retrieved', activity);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createActivitySchema.parse(req.body);
      const activity = await this.service.createActivity(input);
      return ApiResponse.success(res, HTTP_STATUS.CREATED, 'Activity created', activity);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = updateActivitySchema.parse(req.body);
      const activity = await this.service.updateActivity(req.params.id, input);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Activity updated', activity);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteActivity(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.NO_CONTENT, 'Activity deleted');
    } catch (error) {
      next(error);
    }
  };
}
