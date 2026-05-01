export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  memberId: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  enabled: boolean;
  memberId: string;
  memberNumber: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface ErrorDTO {
  statusCode: number;
  error: string;
  message: string;
}
