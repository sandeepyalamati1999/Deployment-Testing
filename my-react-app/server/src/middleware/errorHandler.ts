import type { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export function notFound(req: Request, res: Response): void {
  sendError(res, `Route ${req.method} ${req.path} not found`, 404);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err.stack);
  sendError(res, err.message || 'Internal server error', 500);
}
