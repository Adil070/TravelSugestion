/**
 * Auth Controller
 * Handles HTTP requests for authentication
 */
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { signupSchema, loginSchema } from './auth.types';
import { ApiResponse } from '../../shared/utils/apiResponse';
import { HTTP_STATUS } from '../../shared/constants/httpStatus';
import { AuthRequest } from '../../shared/middleware/auth.middleware';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = signupSchema.parse(req.body);
      const result = await this.service.signup(input);
      return ApiResponse.success(res, HTTP_STATUS.CREATED, 'User created successfully', result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = loginSchema.parse(req.body);
      const result = await this.service.login(input);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Login successful', result);
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const user = await this.service.getProfile(userId);
      return ApiResponse.success(res, HTTP_STATUS.OK, 'Profile retrieved', user);
    } catch (error) {
      next(error);
    }
  };
}
