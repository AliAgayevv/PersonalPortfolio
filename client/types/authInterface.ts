export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface JwtPayload {
  username?: string;
  exp?: number;
  [key: string]: any;
}
