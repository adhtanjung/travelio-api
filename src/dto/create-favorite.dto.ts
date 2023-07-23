import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly bookId: string;
}
