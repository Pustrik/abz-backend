import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from './redis.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RedisService],
})
export class AuthModule {}
