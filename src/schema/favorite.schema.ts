import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Favorites {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  thumbnail: string;

  @Prop()
  rating: number;

  @Prop()
  userId: string;

  @Prop()
  bookId: string;
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
