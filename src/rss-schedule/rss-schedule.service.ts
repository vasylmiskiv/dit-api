import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { ArticlesRepository } from '../articles/articles.repository';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class RssScheduleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesRepository: ArticlesRepository,
  ) {}
  private readonly logger = new Logger(RssScheduleService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async findAll() {
    await firstValueFrom(
      this.httpService.get(
        `${process.env.NATURE_NEWS_URL}&apiKey=${process.env.API_KEY}`,
      ),
    ).then((res) => {
      this.articlesRepository.updateArticles(res.data.articles);
    });
  }
}
