import { plainToInstance } from 'class-transformer';

import { UserDocument } from '../schemas/user.schema';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(this: void, user: UserDocument): UserResponseDto {
    return plainToInstance(
      UserResponseDto,
      {
        id: user._id.toString(),

        name: user.name,
        email: user.email,
        role: user.role,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toResponseList(this: void, users: UserDocument[]): UserResponseDto[] {
    return users.map(UserMapper.toResponse);
  }
}
