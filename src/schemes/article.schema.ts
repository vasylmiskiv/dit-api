import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({
    type: {
      id: { type: String, required: false },
      name: { type: String, required: true },
    },
  })
  source: {
    id: string | null;
    name: string;
  };

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  urlToImage: string;

  @Prop()
  publishedAt: string;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
