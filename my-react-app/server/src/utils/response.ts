import type { Response } from 'express';
import type { ApiResponse } from '../types';

export function sendSuccess<T>(res: Response, data: T, message = 'Success', statusCode = 200): void {
  const body: ApiResponse<T> = { data, status: statusCode, message };
  res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode = 500): void {
  const body: ApiResponse<null> = { data: null, status: statusCode, message };
  res.status(statusCode).json(body);
}
