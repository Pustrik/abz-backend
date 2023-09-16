import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TokenGuard } from './common/guards/token.guard';
import { dataSourceOptions } from './common/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './common/modules/auth/auth.module';
import { UserModule } from './common/modules/user/user.module';
import { PositionModule } from './common/modules/position/position.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { RedisService } from './common/modules/auth/redis.service';
import { ReuseGuard } from './common/guards/reuse.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => dataSourceOptions,
    }),
    AuthModule,
    UserModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [
    RedisService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ReuseGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
