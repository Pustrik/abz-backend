import { ValidationError } from 'class-validator';
import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationException } from '../exceptions';

export class ValidationConfig implements ValidationPipeOptions {
  public transform = false;

  constructor(config?: ValidationPipeOptions) {
    Object.assign(this, config);
  }

  exceptionFactory(errors: ValidationError[]) {
    const messages = 'Validation failed';
    const fails = {};
    errors.forEach((e) => {
      fails[e.property] = [];
      for (const key in e.constraints) {
        fails[e.property].push(e.constraints[key]);
      }
    });
    return new ValidationException(messages, fails);
  }
}
