import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Article } from './entities/article.schema';
import { sortStrategies } from './strategies/sort-strategies';

import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async getAmountArticles() {
    return await this.articleModel.countDocuments();
  }

  async getAmountArticlesByKeywords(keywords: string[]): Promise<number> {
    const amount = await this.articleModel
      .countDocuments({
        $or: [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { description: { $regex: keywords.join('|'), $options: 'i' } },
          { content: { $regex: keywords.join('|'), $options: 'i' } },
        ],
      })
      .exec();

    return amount;
  }

  async updateArticles(newArticles: Article[]): Promise<void> {
    await this.articleModel.deleteMany({});
    await this.articleModel.insertMany(newArticles);
  }

  async updateAnArticle(id: string, dto: UpdateArticleDto) {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    console.log(updatedArticle);

    return updatedArticle;
  }

  async getArticles(
    pageSize: number,
    pageOffset: number,
    sortBy: string,
  ): Promise<Article[]> {
    let sortOption = sortStrategies[sortBy];

    if (!sortOption) {
      sortOption = sortStrategies['desc'];
    }

    return this.articleModel
      .find()
      .sort(sortOption)
      .skip(pageSize * (pageOffset - 1))
      .limit(pageSize)
      .exec();
  }

  async getArticlesByKeywords(
    keywords: string[],
    pageSize: number,
    pageOffset: number,
    sortBy: string,
  ): Promise<Article[]> {
    let sortOption = sortStrategies[sortBy];

    if (!sortOption) {
      sortOption = sortStrategies['desc'];
    }

    const searchResults = await this.articleModel
      .find({
        $or: [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { description: { $regex: keywords.join('|'), $options: 'i' } },
          { content: { $regex: keywords.join('|'), $options: 'i' } },
        ],
      })
      .sort(sortOption)
      .skip(pageSize * (pageOffset - 1))
      .limit(pageSize)
      .exec();

    return searchResults;
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async deleteArticle(id: string): Promise<void> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id);

    return deletedArticle.id;
  }
}
