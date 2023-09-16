import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './base.abstract.model';
import UserModel from './user.model';

@Entity('photos')
export default class PhotoModel extends BaseModel {
  @ApiProperty()
  @Column()
  @IsString()
  name: string;

  @ApiProperty()
  @Column()
  @IsNumber()
  size: number;

  @ApiProperty({ type: UserModel })
  @ManyToOne(() => UserModel, (user) => user.photos)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
