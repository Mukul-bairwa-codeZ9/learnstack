import { Role } from '@/features/access/types/role';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isHydrated: boolean;

}