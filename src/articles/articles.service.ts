import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  create(createArticleDto: CreateArticleDto) {
    return 'Add a new article';
  }

  async findAllArticles() {
    const articles = await this.articlesRepository.getArticles();

    if (!articles.length) {
      throw new NotFoundException('Article list is empty');
    }

    return articles;
  }

  async findArticle(id: string) {
    const foundedArticle = await this.articlesRepository.getArticleById(id);

    if (!foundedArticle) {
      throw new NotFoundException('Article not found');
    }

    return foundedArticle;
  }

  updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    return `Update article`;
  }

  removeArticle(id: string) {
    return this.articlesRepository.deleteArticle(id);
  }
}
