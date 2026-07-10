import { plainToInstance } from 'class-transformer';

import { UserDocument } from '../../users/schemas/user.schema';
import { AuthUserDto } from '../dto/auth.dto';

export class AuthMapper {
  static toUser(this: void, user: UserDocument): AuthUserDto {
    return plainToInstance(
      AuthUserDto,
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
