import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get mongodb(): string {
    return this.configService.get<string>('app.mongodb');
  }
  get jwtsecret(): string {
    return this.configService.get<string>('app.jwtsecret');
  }
  get news(): string {
    return this.configService.get<string>('app.news');
  }
  get newskey(): number {
    return this.configService.get<number>('app.newskey');
  }
}
