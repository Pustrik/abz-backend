import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class ConflictException extends CustomException {
  constructor(message: string | string[]) {
    super(message, HttpStatus.CONFLICT);
  }
}
