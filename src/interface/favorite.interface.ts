import { Document } from 'mongoose';

export interface IFavorite extends Document {
  readonly title: string;

  readonly author: string;

  readonly thumbnail: string;

  readonly rating: number;

  readonly userId: string;

  readonly bookId: string;
}
