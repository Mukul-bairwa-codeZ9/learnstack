import { Role } from '../../access/enums/role.enum';

export class AuthUserDto {
  id: string;
  name: string;
  email: string;
  role: Role;
}