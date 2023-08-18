import { Test, TestingModule } from '@nestjs/testing';
import { RssScheduleService } from './rss-schedule.service';

describe('RssScheduleService', () => {
  let service: RssScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RssScheduleService],
    }).compile();

    service = module.get<RssScheduleService>(RssScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
