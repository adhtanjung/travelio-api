import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { FavoriteService } from 'src/service/favorite/favorite.service';
import { CreateFavoriteDto } from '../../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../../dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async createFavorite(
    @Req() req,
    @Res() response,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    try {
      const book = await this.favoriteService.getUserBookById(
        createFavoriteDto.bookId,
        createFavoriteDto.userId
      );
      if (book)
        throw new HttpException(
          'book already registered as your favorite',
          HttpStatus.NOT_ACCEPTABLE,
        );

      const newFavorite = await this.favoriteService.createFavorite(
        createFavoriteDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Favorite has been created successfully',
        newFavorite,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err.message,
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateFavorite(
    @Res() response,
    @Param('id') FavoriteId: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    try {
      const existingFavorite = await this.favoriteService.updateFavorite(
        FavoriteId,
        updateFavoriteDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Favorite has been successfully updated',
        existingFavorite,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getFavorites(@Res() response) {
    try {
      const FavoriteData = await this.favoriteService.getAllFavorites();
      return response.status(HttpStatus.OK).json({
        message: 'All Favorites data found successfully',
        FavoriteData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:userId')
  async getFavoritesByUserId(@Res() response, @Param('userId') userId: string) {
    try {
      const existingFavorite = await this.favoriteService.getFavoritesByUserId(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Favorites found successfully',
        existingFavorite,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteFavorite(@Res() response, @Param('id') FavoriteId: string) {
    try {
      const deletedFavorite = await this.favoriteService.deleteFavorite(
        FavoriteId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Favorite deleted successfully',
        deletedFavorite,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
