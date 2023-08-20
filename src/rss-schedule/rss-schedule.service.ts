import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticlesRepository } from '../articles/articles.repository';

@Injectable()
export class RssScheduleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly articlesRepository: ArticlesRepository,
  ) {}
  private readonly logger = new Logger(RssScheduleService.name);

  // @Cron('0 0 */1 * * *')
  @Cron('*/20 * * * * *')
  async findAll() {
    await firstValueFrom(
      this.httpService.get(
        `${process.env.NATURE_NEWS_URL}&apiKey=${process.env.API_KEY}`,
      ),
    ).then((res) => {
      console.log(res.data.articles);
      this.articlesRepository.updateArticles(res.data.articles);
    });
  }
}
