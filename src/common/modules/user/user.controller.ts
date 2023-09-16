import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../../decorators/public.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IdParam } from '../../validation/id.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import PhotoValidator from '../../validation/photo.validator';
import { CreateUserDTO, ReturnPaginationDTO, ReturnUserDTO } from './user.dto';
import { PaginationQuery } from '../../validation/pagination.validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiTags('User')
  @UseInterceptors(FileInterceptor('photo'))
  createUser(
    @UploadedFile(PhotoValidator)
    photo: Express.Multer.File,
    @Body() dto: CreateUserDTO,
  ) {
    return this.userService.createUser(dto, photo);
  }

  @Get(':id')
  @Public()
  @ApiTags('User')
  @UseInterceptors(TransformInterceptor)
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({
    description: 'Returns user',
    type: ReturnUserDTO,
  })
  async getUserById(@Param() { id }: IdParam) {
    return this.userService.getUserById(id);
  }

  @Get()
  @Public()
  @ApiTags('User')
  @ApiQuery({
    name: 'count',
    description: 'Amount of uer per page',
  })
  @ApiQuery({
    name: 'offset',
    description: 'Amount of skipped users',
  })
  @ApiQuery({
    name: 'page',
    description: 'Number of current page',
  })
  @ApiOkResponse({
    description: 'Returns page of users',
    type: ReturnPaginationDTO,
  })
  async paginateUsers(
    @Query(new ValidationPipe()) { count = 5, offset, page }: PaginationQuery,
  ) {
    return this.userService.paginateUsers(count, offset, page);
  }
}
