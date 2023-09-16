import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import swagger from './swagger/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationConfig } from './common/config/validation.config';
import { RequestInterceptor } from './common/interceptors/request.iterceptor';
import { AllExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  app.enableCors();
  swagger(app);
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'favicon.ico', method: RequestMethod.GET },
    ],
  });
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new RequestInterceptor());
  app.useGlobalPipes(new ValidationPipe(new ValidationConfig()));
  await app.listen(port || 3000, () => {
    Logger.log(`App started on port: ${port}`);
  });
}
bootstrap();
