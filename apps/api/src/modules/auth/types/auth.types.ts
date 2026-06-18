import { Request } from 'express';
import { Role } from '../../access/enums/role.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}
