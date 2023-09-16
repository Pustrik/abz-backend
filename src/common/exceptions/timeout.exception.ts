import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class TimeoutException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}
