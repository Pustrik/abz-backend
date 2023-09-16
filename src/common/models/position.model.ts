import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './base.abstract.model';
import UserModel from './user.model';

@Entity('positions')
export default class PositionModel extends BaseModel {
  @ApiProperty()
  @Column()
  @IsString()
  name: string;

  @ApiProperty()
  @Column()
  @IsString()
  description: string;

  @OneToMany(() => UserModel, (user) => user.position)
  users: UserModel[];
}
