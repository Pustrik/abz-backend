import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PositionModel from '../../models/position.model';
import PhotoModel from '../../models/photo.model';
import { JwtModule } from '@nestjs/jwt';
import UserModel from '../../models/user.model';
import { S3Service } from './s3service';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PositionModel, PhotoModel, UserModel]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService, S3Service, PhotoService],
})
export class UserModule {}
