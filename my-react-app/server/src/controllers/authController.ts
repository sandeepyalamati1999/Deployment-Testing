import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as store from '../utils/store';
import { sendSuccess, sendError } from '../utils/response';
import type { LoginBody, RegisterBody } from '../types';

function signToken(id: number, email: string): string {
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as `${number}${'s'|'m'|'h'|'d'}`,
  });
}

export function register(req: Request, res: Response): void {
  const { name, email, password } = req.body as RegisterBody;

  if (!name || !email || !password) {
    sendError(res, 'name, email, and password are required', 400);
    return;
  }
  if (password.length < 6) {
    sendError(res, 'Password must be at least 6 characters', 400);
    return;
  }
  if (store.findByEmail(email)) {
    sendError(res, 'Email already in use', 409);
    return;
  }

  const user = store.create(name, email, password);
  const token = signToken(user.id, user.email);
  sendSuccess(res, { user, token }, 'Registration successful', 201);
}

export function login(req: Request, res: Response): void {
  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    sendError(res, 'email and password are required', 400);
    return;
  }

  const record = store.findByEmail(email);
  if (!record || !bcrypt.compareSync(password, record.passwordHash)) {
    sendError(res, 'Invalid credentials', 401);
    return;
  }

  const { passwordHash: _, ...user } = record;
  const token = signToken(user.id, user.email);
  sendSuccess(res, { user, token }, 'Login successful');
}

export function me(req: Request, res: Response): void {
  const record = store.findById(req.user!.id);
  if (!record) {
    sendError(res, 'User not found', 404);
    return;
  }
  const { passwordHash: _, ...user } = record;
  sendSuccess(res, user, 'Authenticated user');
}
