import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CustomException } from './custom.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const status =
      exception instanceof CustomException ||
      (exception instanceof HttpException &&
        !(exception instanceof NotFoundException))
        ? exception.getStatus()
        : exception instanceof NotFoundException
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;
    console.error(exception.stack, `Exception: ${message} Code: ${status}`);

    if (typeof message === 'string') message = { message };
    const errorObject = {
      success: false,
      ...message,
    };

    response.status(status).json(errorObject);
  }
}
