import { BadRequestException } from '@nestjs/common';

export class UserRegistrationException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
