import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default abstract class BaseModel extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  @ApiProperty()
  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
