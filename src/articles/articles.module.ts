import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { Article, ArticleSchema } from './entities/article.schema';
import { User, UserSchema } from 'src/users/entities/user.schema';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';

import { UserRepository } from 'src/users/user.repository';

import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret-cat',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository, JwtStrategy, UserRepository],
  exports: [ArticlesService, ArticlesRepository, UserRepository],
})
export class ArticlesModule {}
