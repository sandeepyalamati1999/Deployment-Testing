import type { Request, Response } from 'express';
import * as store from '../utils/store';
import { sendSuccess, sendError } from '../utils/response';
import type { UpdateUserBody } from '../types';

export function getAll(_req: Request, res: Response): void {
  sendSuccess(res, store.findAll(), 'Users retrieved');
}

export function getOne(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const record = store.findById(id);
  if (!record) {
    sendError(res, 'User not found', 404);
    return;
  }
  const { passwordHash: _, ...user } = record;
  sendSuccess(res, user, 'User retrieved');
}

export function updateOne(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (req.user!.id !== id) {
    sendError(res, 'Forbidden', 403);
    return;
  }

  const { name, email } = req.body as UpdateUserBody;
  if (!name && !email) {
    sendError(res, 'Provide at least name or email to update', 400);
    return;
  }
  if (email && store.findByEmail(email) && store.findByEmail(email)!.id !== id) {
    sendError(res, 'Email already in use', 409);
    return;
  }

  const updated = store.update(id, { name, email });
  if (!updated) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, updated, 'User updated');
}

export function deleteOne(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (req.user!.id !== id) {
    sendError(res, 'Forbidden', 403);
    return;
  }
  if (!store.remove(id)) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, null, 'User deleted');
}
