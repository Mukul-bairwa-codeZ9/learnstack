import { Injectable } from '@nestjs/common';

import { InjectConnection } from '@nestjs/mongoose';

import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  getReadiness() {
    const databaseUp =
      this.connection.readyState === ConnectionStates.connected;

    return {
      status: databaseUp ? 'ready' : 'not_ready',
      database: databaseUp ? 'up' : 'down',
      timestamp: new Date().toISOString(),
    };
  }
}
