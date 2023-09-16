import { HttpException } from '@nestjs/common';

export abstract class CustomException extends HttpException {
  protected code: number;

  constructor(message: string | string[], status: number, fails?: {}) {
    if (fails) super({ message, fails }, status);
    else super({ message: message }, status);
  }
}
