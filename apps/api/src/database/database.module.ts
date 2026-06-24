import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigType } from '@nestjs/config';

import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),

    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],

      inject: [databaseConfig.KEY],

      useFactory: (
        databaseConfiguration: ConfigType<typeof databaseConfig>,
      ) => ({
        uri: databaseConfiguration.uri,
      }),
    }),
  ],
})
export class DatabaseModule {}
