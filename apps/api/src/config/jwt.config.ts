import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,

  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '15m',

  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? '7d',
}));
