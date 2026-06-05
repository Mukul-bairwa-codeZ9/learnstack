import { Role } from '../enums/role.enum';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}