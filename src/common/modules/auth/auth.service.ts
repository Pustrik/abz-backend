import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from './redis.service';

export interface Token {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}
  async getToken(): Promise<Token> {
    const token = await this.jwtService.signAsync(
      {},
      {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: '40m',
      },
    );

    await this.redisService.saveToken(token);

    return {
      token: token,
    };
  }
}
