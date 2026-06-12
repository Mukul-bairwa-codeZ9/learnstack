import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AccessModule } from './modules/access/access.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PublicContentModule } from './modules/public-content/public-content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    AuthModule,

    UsersModule,

    AccessModule,

    WorkspacesModule,

    DocumentsModule,

    PublicContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
