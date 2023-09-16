import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PositionModel from '../../models/position.model';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionModel)
    private readonly positionRepository: Repository<PositionModel>,
  ) {}

  getPositions(): Promise<PositionModel[]> {
    return this.positionRepository.find({ select: ['id', 'name'] });
  }
}
