import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RssScheduleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}
  private readonly logger = new Logger(RssScheduleService.name);

  @Cron('0 0 */1 * * *')
  findAll(): void {
    const response$: Observable<AxiosResponse<any>> = this.httpService
      .get(`${process.env.NATURE_NEWS_URL}&apiKey=${process.env.API_KEY}`)
      .pipe(
        tap((response) => {
          // this.logger.debug(response.data);
          this.databaseService.updateArticles(response.data.articles);
        }),
      );

    response$.subscribe(() => {});
  }
}
