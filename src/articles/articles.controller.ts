import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
  findAll() {
    return this.articlesService.findAllArticles();
  }

  @Get(':id')
  async findArticle(@Param('id') id: string) {
    return await this.articlesService.findArticle(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRssDto: UpdateArticleDto) {
    return this.articlesService.updateArticle(+id, updateRssDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeArticle(@Param('id') id: string) {
    return this.articlesService.removeArticle(id);
  }
}
