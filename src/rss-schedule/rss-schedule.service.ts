import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { ArticlesRepository } from '../articles/articles.repository';
import { CronExpression } from '@nestjs/schedule';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class RssScheduleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesRepository: ArticlesRepository,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async findAll() {
    const natureNewsUrl = this.configService.get('NATURE_NEWS_URL');
    const apiKey = this.configService.get('API_KEY');

    await firstValueFrom(
      this.httpService.get(`${natureNewsUrl}&apiKey=${apiKey}`),
    ).then((res) => {
      this.articlesRepository.updateArticles(res.data.articles);
    });
  }
}
