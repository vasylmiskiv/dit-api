import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { RssScheduleService } from './rss-schedule/rss-schedule.service';

import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesRepository } from './articles/articles.repository';
import { Article, ArticleSchema } from './articles/entities/article.schema';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { UserRepository } from './users/user.repository';
import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/entities/user.schema';

import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    AppConfigModule,
    ArticlesModule,
    AuthModule,
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        uri: appConfigService.mongodb,
      }),
      inject: [AppConfigService],
    }),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AuthController, ArticlesController],
  providers: [
    AppConfigService,
    RssScheduleService,
    ArticlesRepository,
    UserRepository,
    ArticlesService,
  ],
})
export class AppModule {}
