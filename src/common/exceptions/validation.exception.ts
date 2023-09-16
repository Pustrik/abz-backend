import { HttpStatus } from '@nestjs/common';
import { CustomException } from './custom.exception';

export class ValidationException extends CustomException {
  constructor(messages: string | string[], fails: {}, errorCode?: number) {
    super(messages, errorCode ?? HttpStatus.UNPROCESSABLE_ENTITY, fails);
  }
}
