import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../modules/auth/redis.service';
import { AuthException } from '../exceptions';

@Injectable()
export class ReuseGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new AuthException('Token not provided');

    const isExist = await this.redisService.findToken(token.split(' ')[1]);
    if (!isExist) throw new AuthException('Must get new token');

    await this.redisService.deleteToken(token.split(' ')[1]);

    return true;
  }
}
