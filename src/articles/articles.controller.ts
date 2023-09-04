import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../utils/jwt.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('search')
  async searchKeywords(
    @Query('keywords') keywords: string,
    @Query('pageSize') pageSize: number,
    @Query('pageOffset') pageOffset: number,
    @Query('sortBy') sortBy: string,
  ) {
    const decodedKeywords = decodeURIComponent(keywords);

    const totalArticles =
      await this.articlesService.getAmountArticlesByKeywords(
        decodedKeywords.split(','),
      );

    const searchResults = await this.articlesService.getArticlesByKeywords(
      decodedKeywords.split(','),
      pageSize,
      pageOffset,
      sortBy,
    );

    const totalPages = Math.ceil(totalArticles / pageSize) || 0;

    return {
      totalPages,
      articles: searchResults,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    const newArticle = this.articlesService.createArticle(dto);

    if (!newArticle) {
      throw new BadRequestException({
        message: 'Something went wrong when created an article',
      });
    }

    return { message: 'Article has been successfully created' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateAnArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
  ) {
    const updatedArticle = await this.articlesService.updateAnArticle(id, dto);

    return { message: 'Article has been successfully updated', updatedArticle };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeArticle(@Param('id') id: string) {
    const deletedAticle = this.articlesService.removeArticle(id);

    if (!deletedAticle) {
      throw new BadRequestException({
        message: `Article doesn't exist or already deleted`,
      });
    }

    return { message: 'Article has been successfully deleted' };
  }
}
