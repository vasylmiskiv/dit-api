import { Injectable } from '@nestjs/common';
import configuration from './configuration';

import { configValidationSchema } from './config-validation';

@Injectable()
export class ConfigService {
  private readonly config = configuration;

  constructor() {
    const { error, value } = configValidationSchema.validate(this.config);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.config = value;
  }

  get(key: string): any {
    return this.config[key];
  }
}
