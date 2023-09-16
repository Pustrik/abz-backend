import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class ForbiddenException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
