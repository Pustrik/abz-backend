import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { PositionService } from './position.service';
import { Public } from '../../decorators/public.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import PositionModel from '../../models/position.model';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  @Public()
  @ApiTags('Position')
  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Return allowed positions array' })
  @ApiOkResponse({
    description:
      'Tokens refreshed successfully, refresh token written in cookie',
    type: PositionModel,
  })
  async getPositions() {
    const positions = await this.positionService.getPositions();
    return { positions };
  }
}
