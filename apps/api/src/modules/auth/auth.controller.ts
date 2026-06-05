import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from '../access/interfaces/current-user.interface';
import { UserDocument } from '../users/schemas/user.schema';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../access/guards/roles.guard';
import { Role } from '../access/enums/role.enum';
import { Roles } from '../access/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: CurrentUserType): UserResponseDto {
    // plainToInstance automatically filters out fields not decorated with @Expose()
    // in your DTO (like the password or refresh token if they were attached)
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser() user: any) {
    return this.authService.logout(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('admin-test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  adminTest() {
    return {
      message: 'Access granted',
    };
  }
}
