import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from '../access/guards/roles.guard';
import { Roles } from '../access/decorators/roles.decorator';
import { Role } from '../access/enums/role.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from '../access/interfaces/current-user.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register new user',
  })
  async signup(@Body() dto: SignupDto): Promise<AuthResponseDto> {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current authenticated user',
  })
  async me(@CurrentUser() user: CurrentUserType): Promise<UserResponseDto> {
    return this.authService.me(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Logout user',
  })
  async logout(
    @CurrentUser() user: CurrentUserType,
  ): Promise<{ loggedOut: boolean }> {
    return this.authService.logout(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('admin-test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Test admin access',
  })
  adminTest(): { message: string } {
    return {
      message: 'Access granted',
    };
  }
}
