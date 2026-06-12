export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface NavItem {
  label: string;
  path: string;
}
