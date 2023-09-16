import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UserModel from '../models/user.model';
import PhotoModel from '../models/photo.model';

export default class PhotoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const users = await dataSource.getRepository(UserModel).find();
    const photos = dataSource.getRepository(PhotoModel);
    const newPhotos: PhotoModel[] = [];
    for (let i = 0; i < 45; i++) {
      const photo = new PhotoModel();
      photo.name = 'mock-photo.jpg';
      photo.size = 1024;
      photo.user = users[i];
      newPhotos.push(photo);
    }
    await photos.insert(newPhotos);
  }
}
