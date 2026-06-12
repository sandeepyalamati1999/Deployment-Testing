import bcrypt from 'bcryptjs';
import type { UserRecord } from '../types';

// In-memory store — swap for a real DB in production
const users: UserRecord[] = [];
let nextId = 1;

export function findAll(): Omit<UserRecord, 'passwordHash'>[] {
  return users.map(({ passwordHash: _, ...u }) => u);
}

export function findById(id: number): UserRecord | undefined {
  return users.find((u) => u.id === id);
}

export function findByEmail(email: string): UserRecord | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function create(name: string, email: string, password: string): Omit<UserRecord, 'passwordHash'> {
  const passwordHash = bcrypt.hashSync(password, 10);
  const record: UserRecord = {
    id: nextId++,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(record);
  const { passwordHash: _, ...safe } = record;
  return safe;
}

export function update(id: number, fields: { name?: string; email?: string }): Omit<UserRecord, 'passwordHash'> | null {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...fields };
  const { passwordHash: _, ...safe } = users[idx];
  return safe;
}

export function remove(id: number): boolean {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

// Seed a demo user on startup
create('Alice Demo', 'alice@example.com', 'password123');
create('Bob Demo', 'bob@example.com', 'password123');
