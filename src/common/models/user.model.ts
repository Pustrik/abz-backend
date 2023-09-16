import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './base.abstract.model';
import PhotoModel from './photo.model';
import PositionModel from './position.model';

@Entity('users')
export default class UserModel extends BaseModel {
  @ApiProperty()
  @Column()
  @IsString()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  @IsPhoneNumber('UA')
  phone: string;

  @ApiProperty({ type: PositionModel })
  @JoinColumn({ name: 'position_id' })
  @ManyToOne(() => PositionModel, (position) => position.users)
  position: PositionModel;

  @OneToMany(() => PhotoModel, (photo) => photo.user)
  photos: PhotoModel[];
}
