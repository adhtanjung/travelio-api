import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteController } from './controller/student/favorite.controller';
import { FavoritesSchema } from './schema/favorite.schema';
import { FavoriteService } from './service/favorite/favorite.service';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URL,

      { dbName: 'travelio' },
    ),
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoritesSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, FavoriteController],
  providers: [AppService, FavoriteService],
})
export class AppModule {}
