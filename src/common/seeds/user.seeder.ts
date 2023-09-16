import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UserModel from '../models/user.model';
import PositionModel from '../models/position.model';
import * as faker from '@ngneat/falso';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const positions = await dataSource.getRepository(PositionModel).find();
    const users = dataSource.getRepository(UserModel);
    const newUsers: UserModel[] = [];
    for (let i = 0; i < 45; i++) {
      const user = new UserModel();
      user.name = faker.randFirstName();
      user.email = faker.randEmail();
      user.phone = faker.randPhoneNumber({ countryCode: 'UA' });
      user.position = positions[Math.floor(Math.random() * positions.length)];
      newUsers.push(user);
    }
    await users.insert(newUsers);
  }
}
