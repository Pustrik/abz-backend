import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './user.dto';
import { S3Service } from './s3service';
import { PhotoService } from './photo.service';
import { ConflictException, NotFoundException } from '../../exceptions';
import PositionModel from '../../models/position.model';
import PhotoModel from '../../models/photo.model';
import UserModel from '../../models/user.model';
const { API_PORT, API_HOST, API_PREFIX } = process.env;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PositionModel)
    private readonly positionRepository: Repository<PositionModel>,
    @InjectRepository(PhotoModel)
    private readonly photoRepository: Repository<PhotoModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly s3Service: S3Service,
    private readonly photoService: PhotoService,
  ) {}

  async createUser(dto: CreateUserDTO, photo: Express.Multer.File) {
    const newUser = await this.saveUser(dto);
    await this.photoService.savePhoto(photo, newUser);
    return { id: newUser.id, message: 'New user successfully registered' };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['position', 'photos'],
    });
    if (!user)
      throw new NotFoundException(
        'The user with the requested identifier does not exist',
        {
          // eslint-disable-next-line camelcase
          user_id: ['User not found'],
        },
      );
    return { user: this.returnUser(user) };
  }

  async paginateUsers(count: number, offset?: number, page?: number) {
    let skipAmount;

    if (offset) {
      skipAmount = offset;
      page = Math.ceil((offset + count) / count);
    } else skipAmount = page ? (page - 1) * count : 0;

    const [users, totalUsers] = await this.userRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      relations: ['position', 'photos'],
      skip: skipAmount,
      take: count,
    });

    const totalPages = Math.ceil(totalUsers / count);

    return this.handlePage(page, totalPages, count, totalUsers, users);
  }

  private async saveUser(dto: CreateUserDTO) {
    const user = new UserModel();
    user.position = await this.positionRepository.findOne({
      where: { id: dto.position_id },
    });
    user.name = dto.name;
    user.phone = dto.phone;
    user.email = dto.email;
    return user.save().catch(() => {
      throw new ConflictException(
        'User with this phone or email already exist',
      );
    });
  }

  async handlePage(
    page: number,
    totalPages: number,
    count: number,
    totalUsers: number,
    users: UserModel[],
  ) {
    return {
      page: page || 1,
      // eslint-disable-next-line camelcase
      total_pages: totalPages,
      // eslint-disable-next-line camelcase
      total_users: totalUsers,
      count: count,
      links: {
        // eslint-disable-next-line camelcase
        next_url:
          page < totalPages
            ? `${API_HOST}${API_PORT}/${API_PREFIX}/users?page=${
                +page + 1
              }&count=${count}`
            : null,
        // eslint-disable-next-line camelcase
        prev_url:
          page > 1
            ? `${API_HOST}${API_PORT}/${API_PREFIX}/users?page=${
                +page - 1
              }&count=${count}`
            : null,
      },
      users: await Promise.all(users.map((user) => this.returnUser(user))),
    };
  }

  async returnUser(user: UserModel) {
    const photo = await this.s3Service.getPhotoURL(user.photos[0].name);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      position: user.position.name,
      // eslint-disable-next-line camelcase
      position_id: user.position.id,
      photo: photo,
    };
  }
}
