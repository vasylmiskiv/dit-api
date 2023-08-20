import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async getAmountArticles() {
    return await this.articlesRepository.getAmountArticles();
  }

  create(createArticleDto: CreateArticleDto) {
    return 'Add a new article';
  }

  async getArticles(pageSize: number, pageOffset: number) {
    const articles = await this.articlesRepository.getArticles(
      pageSize,
      pageOffset,
    );

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
