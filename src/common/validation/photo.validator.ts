import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { ValidationException } from '../exceptions';

export default new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'jpeg',
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 5,
  })
  .build({
    exceptionFactory(error) {
      throw new ValidationException(
        'Validation exception',
        error,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    },
  });
