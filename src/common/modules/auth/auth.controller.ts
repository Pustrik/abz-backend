import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('token')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Returns the authentication token' })
  @ApiOkResponse({
    description: 'Returns token',
  })
  getToken() {
    return this.authService.getToken();
  }
}
