import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PositionsEnum } from '../../enums/positions.enum';
import { Type } from 'class-transformer';
import PhotoModel from '../../models/photo.model';
import { ConfigModule } from '@nestjs/config';

const emailRegExp =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+\])$)/;
const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;

ConfigModule.forRoot({});

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(60)
  @ApiProperty()
  name: string;

  @ApiProperty()
  @MinLength(2)
  @MaxLength(100)
  @IsEmail()
  @Matches(emailRegExp, {
    message: 'Wrong email format',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  @Matches(phoneRegExp, {
    message: 'Wrong phone format',
  })
  phone: string;

  @ApiProperty()
  @Type(() => Number)
  // @IsEnum(PositionsEnum)
  @IsNotEmpty()
  // eslint-disable-next-line camelcase
  position_id: PositionsEnum;
}

class DetailUserDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  // eslint-disable-next-line camelcase
  position_id: number;
  @ApiProperty()
  photo: PhotoModel[];
}

export class ReturnUserDTO {
  @ApiProperty()
  success: string;
  @ApiProperty({ type: DetailUserDTO })
  user: DetailUserDTO;
}

class LinksDTO {
  @ApiProperty()
  // eslint-disable-next-line camelcase
  next_url: string;
  @ApiProperty()
  // eslint-disable-next-line camelcase
  prev_url: string;
}

export class ReturnPaginationDTO {
  @ApiProperty()
  success: string;
  @ApiProperty()
  page: number;
  @ApiProperty()
  // eslint-disable-next-line camelcase
  total_pages: number;
  @ApiProperty()
  // eslint-disable-next-line camelcase
  total_users: number;
  @ApiProperty()
  count: number;
  @ApiProperty({ type: LinksDTO })
  links: LinksDTO;
  @ApiProperty({ type: [DetailUserDTO] })
  users: DetailUserDTO[];
}
