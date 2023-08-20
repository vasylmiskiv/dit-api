import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Article } from './entities/article.schema';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async getAmountArticles() {
    return await this.articleModel.countDocuments();
  }

  async updateArticles(newArticles: Article[]): Promise<void> {
    await this.articleModel.deleteMany({});
    await this.articleModel.insertMany(newArticles);
  }

  async getArticles(pageSize: number, pageOffset: number): Promise<Article[]> {
    return (
      this.articleModel
        .find()
        // .sort({ createdAt: -1 })
        .limit(pageSize)
        .exec()
    );
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async deleteArticle(id: string): Promise<void> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id);

    return deletedArticle.id;
  }
}
