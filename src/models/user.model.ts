export interface Photo {
  id: number;
  name: string;
  url: string;
  user: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: string | null;
  isActive: boolean;
  avatar: string;
  photos?: Photo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
  avatar?: File;
  photos?: File[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}
