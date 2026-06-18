import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(
    err: unknown,
    user: unknown,
    info: { message?: string } | undefined,
  ): TUser {
    if (!user) {
      throw new UnauthorizedException(info?.message ?? 'Unauthorized');
    }

    return user as TUser;
  }
}
