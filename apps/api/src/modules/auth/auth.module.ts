import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    UsersModule,

    PassportModule,

    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],

      inject: [jwtConfig.KEY],

      useFactory: (jwtConfiguration: ConfigType<typeof jwtConfig>) => ({
        secret: jwtConfiguration.secret,

        signOptions: {
          expiresIn: jwtConfiguration.accessTokenExpiresIn as never,
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  exports: [JwtModule],
})
export class AuthModule {}
