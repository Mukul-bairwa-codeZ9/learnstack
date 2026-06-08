import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { CurrentUser } from 'src/modules/access/interfaces/current-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: { sub: string }) : Promise<CurrentUser>{
    const user = await this.usersService.findById(payload.sub);
     console.log('JWT Payload:', payload);


    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
