import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigType } from '@nestjs/config';

import jwtConfig from '../../config/jwt.config';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthMapper } from './mapper/auth.mapper';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UserMapper } from '../users/mapper/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user);

    return {
      user: AuthMapper.toUser(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    return {
      user: AuthMapper.toUser(user),
      ...tokens,
    };
  }

  async generateTokens(user: UserDocument) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.jwtConfiguration.secret,

        expiresIn: this.jwtConfiguration.accessTokenExpiresIn as never,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: this.jwtConfiguration.refreshSecret,

        expiresIn: this.jwtConfiguration.refreshTokenExpiresIn as never,
      },
    );

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string): Promise<{ loggedOut: boolean }> {
    await this.usersService.updateRefreshToken(userId, null);

    return {
      loggedOut: true,
    };
  }

  async me(userId: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return UserMapper.toResponse(user);
  }
}
