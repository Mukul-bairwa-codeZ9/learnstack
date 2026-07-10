import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new Logger('Bootstrap');

  const appConfiguration = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());

  app.enableCors({
    origin: [appConfiguration.frontendUrl],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
    }),
  );

  const port = appConfiguration.port;

  if (appConfiguration.nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Developer Docs Platform API')
      .setDescription('Production API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter your JWT access token',
          in: 'header',
        },
        'JWT-auth', // This is the security name used to link routes
      )
      .addSecurityRequirements('JWT-auth') // Globally forces Swagger UI to send this token on all API routes
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
    logger.log(`Swagger UI available at http://localhost:${port}/docs`);
  }

  await app.listen(port);
  logger.log(`API running on http://localhost:${port}/api/v1`);
}

void bootstrap();
