export interface AuthState {
  user?: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}
export interface RegisterRequest {
  name?: string;
  email?: string;
  password?: string;
}
