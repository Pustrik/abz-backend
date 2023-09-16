import { CustomException } from './custom.exception';
import { HttpStatus } from '@nestjs/common';

export class AuthException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
