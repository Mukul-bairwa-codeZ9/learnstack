import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Healh Check')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Health status',
  })
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get('ready')
  @ApiOperation({
    summary: 'Server ready status',
  })
  getReadiness() {
    return this.healthService.getReadiness();
  }
}
