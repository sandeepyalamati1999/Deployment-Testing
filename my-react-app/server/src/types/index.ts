export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserRecord extends User {
  passwordHash: string;
}

export interface AuthPayload {
  id: number;
  email: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserBody {
  name?: string;
  email?: string;
}

// Augment express Request so req.user is typed after JWT middleware
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
