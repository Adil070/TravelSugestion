/**
 * User Controller
 * Handles HTTP requests for user management
 */
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { updateUserSchema } from './user.types';
import { ApiResponse } from '../../shared/utils/apiResponse';
import { HTTP_STATUS } from '../../shared/constants/httpStatus';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllUsers();
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Users retrieved', users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.getUserById(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'User retrieved', user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = updateUserSchema.parse(req.body);
      const user = await this.service.updateUser(req.params.id, input);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'User updated', user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteUser(req.params.id);
      return ApiResponse.success(res, HTTP_STATUS.NO_CONTENT, 'User deleted');
    } catch (error) {
      next(error);
    }
  };
}
