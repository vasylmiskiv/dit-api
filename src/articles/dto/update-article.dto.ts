import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  title?: string;
  description?: string;
  author?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: Date;
  content?: string;
}
