import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from '../../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../../dto/update-favorite.dto';
import { IFavorite } from '../../interface/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private favoriteModel: Model<IFavorite>,
  ) {}

  async createFavorite(
    createFavoriteDto: CreateFavoriteDto,
  ): Promise<IFavorite> {
    const newFavorite = await new this.favoriteModel(createFavoriteDto);
    return newFavorite.save();
  }

  async getByBookId(bookId: string): Promise<IFavorite> {
    const book = await this.favoriteModel.findOne({
      bookId,
    });
    return book;
  }

  async updateFavorite(
    FavoriteId: string,
    updateFavoriteDto: UpdateFavoriteDto,
  ): Promise<IFavorite> {
    const existingFavorite = await this.favoriteModel.findByIdAndUpdate(
      FavoriteId,
      updateFavoriteDto,
      { new: true },
    );
    if (!existingFavorite) {
      throw new NotFoundException(`Favorite #${FavoriteId} not found`);
    }
    return existingFavorite;
  }

  async getAllFavorites(): Promise<IFavorite[]> {
    const favoriteData = await this.favoriteModel.find();
    if (!favoriteData || favoriteData.length == 0) {
      throw new NotFoundException('favorites data not found!');
    }
    return favoriteData;
  }

  async getFavorite(favoriteId: string): Promise<IFavorite> {
    const existingFavorite = await this.favoriteModel
      .findById(favoriteId)
      .exec();
    if (!existingFavorite) {
      throw new NotFoundException(`favorite #${favoriteId} not found`);
    }
    return existingFavorite;
  }
  async getFavoritesByUserId(userId: string): Promise<IFavorite[]> {
    const existingFavorite = await this.favoriteModel.find({ userId }).exec();

    if (existingFavorite.length === 0) {
      throw new NotFoundException(`favorite #${userId} not found`);
    }
    return existingFavorite;
  }

  async deleteFavorite(FavoriteId: string): Promise<IFavorite> {
    const deletedFavorite = await this.favoriteModel.findByIdAndDelete(
      FavoriteId,
    );
    if (!deletedFavorite) {
      throw new NotFoundException(`Favorite #${FavoriteId} not found`);
    }
    return deletedFavorite;
  }
}
