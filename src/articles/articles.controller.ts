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
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../utils/jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search articles by keywords',
    description: 'Search articles by keywords.',
  })
  @ApiQuery({
    name: 'keywords',
    description: 'Comma-separated keywords',
    required: true,
  })
  @ApiQuery({ name: 'pageSize', description: 'Number of articles per page' })
  @ApiQuery({ name: 'pageOffset', description: 'Page offset' })
  @ApiQuery({ name: 'sortBy', description: 'Sorting criteria' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search results',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input parameters',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
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
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new article',
    description: 'Create a new article.',
  })
  @ApiCreatedResponse({
    description: 'Article successfully created.',
    type: CreateArticleDto,
  })
  @ApiBearerAuth()
  async createArticle(@Body() dto: CreateArticleDto) {
    const newArticle = this.articlesService.createArticle(dto);

    if (!newArticle) {
      throw new BadRequestException({
        message: 'Something went wrong when creating an article',
      });
    }

    return { message: 'Article has been successfully created' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update an article',
    description: 'Update an article by ID.',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Article ID' })
  async updateAnArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
  ) {
    const updatedArticle = await this.articlesService.updateAnArticle(id, dto);

    return { message: 'Article has been successfully updated', updatedArticle };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an article',
    description: 'Delete an article by ID.',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Article ID' })
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
