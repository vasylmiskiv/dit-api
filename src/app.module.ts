import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RssScheduleService } from './rss-schedule/rss-schedule.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ArticlesModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, RssScheduleService, DatabaseService],
})
export class AppModule {}
