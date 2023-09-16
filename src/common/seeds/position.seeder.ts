import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import PositionModel from '../models/position.model';
import { PositionsInfo } from '../enums/positions.enum';

export default class PositionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PositionModel);
    await repository.insert([
      {
        name: PositionsInfo.DESIGNER.name,
        description: PositionsInfo.DESIGNER.name,
      },
      {
        name: PositionsInfo.SECURITY.name,
        description: PositionsInfo.SECURITY.name,
      },
      {
        name: PositionsInfo.CONTENT_MANGER.name,
        description: PositionsInfo.CONTENT_MANGER.name,
      },
      {
        name: PositionsInfo.LAWYER.name,
        description: PositionsInfo.LAWYER.name,
      },
    ]);
  }
}
