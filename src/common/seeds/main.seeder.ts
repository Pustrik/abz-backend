import { runSeeder, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UserSeeder from './user.seeder';
import PositionSeeder from './position.seeder';
import PhotoSeeder from './photo.seeder';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, PositionSeeder);
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, PhotoSeeder);
  }
}
