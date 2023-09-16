import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class InternalException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
