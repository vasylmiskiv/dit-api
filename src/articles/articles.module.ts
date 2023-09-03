import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './entities/article.schema';
import { ArticlesRepository } from './articles.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserRepository } from 'src/users/user.repository';
import { User, UserSchema } from 'src/users/entities/user.schema';

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
