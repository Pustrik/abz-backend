import { Injectable } from '@nestjs/common';
import UserModel from '../../models/user.model';
import { Repository } from 'typeorm';
import PositionModel from '../../models/position.model';
import PhotoModel from '../../models/photo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from './s3service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import tinify from 'tinify';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PositionModel)
    private readonly photoRepository: Repository<PhotoModel>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    tinify.key = this.configService.get<string>('TINIFY_API_KEY');
  }

  async savePhoto(photo: Express.Multer.File, user: UserModel) {
    const name = uuidv4() + '.jpg';
    const newBuffer = await this.tinifyPhoto(photo);
    await this.s3Service.uploadPhoto(newBuffer, name);
    const newPhoto = new PhotoModel();

    newPhoto.name = name;
    newPhoto.size = newBuffer.length;
    newPhoto.user = user;
    return newPhoto.save();
  }

  private async tinifyPhoto(photo: Express.Multer.File) {
    return await tinify
      .fromBuffer(photo.buffer)
      .resize({
        method: 'cover',
        width: 70,
        height: 70,
      })
      .toBuffer();
  }
}
