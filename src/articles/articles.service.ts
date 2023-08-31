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

  async getAmountArticlesByKeywords(keywords: string[]): Promise<number> {
    const count =
      await this.articlesRepository.getAmountArticlesByKeywords(keywords);
    return count;
  }

  create(createArticleDto: CreateArticleDto) {
    return 'Add a new article';
  }

  async getArticles(pageSize: number, pageOffset: number, sortBy: string) {
    const articles = await this.articlesRepository.getArticles(
      pageSize,
      pageOffset,
      sortBy,
    );

    return articles;
  }

  async getArticlesByKeywords(
    keywords: string[],
    pageSize: number,
    pageOffset: number,
    sortBy: string,
  ) {
    const getArticlesByKeywords =
      await this.articlesRepository.getArticlesByKeywords(
        keywords,
        pageSize,
        pageOffset,
        sortBy,
      );

    return getArticlesByKeywords;
  }

  async findArticle(id: string) {
    const foundedArticle = await this.articlesRepository.getArticleById(id);

    if (!foundedArticle) {
      throw new NotFoundException('Article not found');
    }

    return foundedArticle;
  }

  async updateAnArticle(id: string, dto: UpdateArticleDto) {
    return await this.articlesRepository.updateAnArticle(id, dto);
  }

  removeArticle(id: string) {
    return this.articlesRepository.deleteArticle(id);
  }
}
