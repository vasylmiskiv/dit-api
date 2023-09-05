import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  urlToImage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  publishedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
