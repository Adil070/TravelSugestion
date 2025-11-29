/**
 * API Response Utility
 * Standardized response format for all API endpoints
 */
import { Response } from 'express';

interface ApiResponseData {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

export class ApiResponse {
  static success(res: Response, statusCode: number, message: string, data?: any) {
    const response: ApiResponseData = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, statusCode: number, message: string, error?: any) {
    const response: ApiResponseData = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(response);
  }
}
