import { AuthUserDto } from './auth.dto';

export class AuthResponseDto {
  user: AuthUserDto;
  accessToken: string;
  refreshToken: string;
}