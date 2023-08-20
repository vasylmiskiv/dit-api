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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../utils/jwt.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createRssDto: CreateArticleDto) {
    return this.articlesService.create(createRssDto);
  }

  @Get()
  async getArticles(
    @Query('pageSize') pageSize: number,
    @Query('pageOffset') pageOffset: number,
  ) {
    const totalArticles = await this.articlesService.getAmountArticles();

    if (!totalArticles) {
      throw new NotFoundException('Articles not found');
    }

    const articles = await this.articlesService.getArticles(
      pageSize,
      pageOffset,
    );

    return {
      totalArticles,
      articles,
    };
  }

  @Get(':id')
  async findArticle(@Param('id') id: string) {
    return await this.articlesService.findArticle(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.updateArticle(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeArticle(@Param('id') id: string) {
    return this.articlesService.removeArticle(id);
  }
}
