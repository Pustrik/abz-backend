import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends CustomException {
  constructor(message: string, fails?: {}) {
    super(message, HttpStatus.NOT_FOUND, fails);
  }
}
