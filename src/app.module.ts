import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RssScheduleService } from './rss-schedule/rss-schedule.service';

import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesRepository } from './articles/articles.repository';
import { Article, ArticleSchema } from './articles/entities/article.schema';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth//auth.controller';

import { UserRepository } from './users/user.repository';

import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/entities/user.schema';

@Module({
  imports: [
    ArticlesModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    HttpModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AppController, AuthController, ArticlesController],
  providers: [
    AppService,
    RssScheduleService,
    ArticlesRepository,
    UserRepository,
    ArticlesService,
  ],
})
export class AppModule {}
