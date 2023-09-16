import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PositionModel from '../../models/position.model';
import PhotoModel from '../../models/photo.model';
import UserModel from '../../models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([PositionModel, PhotoModel, UserModel]),
    JwtModule,
  ],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
