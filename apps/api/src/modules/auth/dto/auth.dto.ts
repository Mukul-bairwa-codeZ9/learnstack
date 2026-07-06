import { Expose } from 'class-transformer';

import { Role } from '../../access/enums/role.enum';

export class AuthUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
