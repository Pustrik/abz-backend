import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

export const healthCheckRoute = '/health';
export const faviconRoute = '/favicon.ico';
@Controller()
export class AppController {
  @Get(healthCheckRoute)
  @Public()
  @ApiTags('Health')
  @HttpCode(200)
  healthCheck() {
    return 'Success';
  }

  @Get(faviconRoute)
  @Public()
  @ApiTags('Health')
  @HttpCode(200)
  favicon() {
    return '';
  }
}
