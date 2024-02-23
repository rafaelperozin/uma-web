export interface Photo {
  id: number;
  name: string;
  url: string;
  user: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserResponse {
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
