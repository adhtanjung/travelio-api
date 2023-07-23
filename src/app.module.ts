import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteController } from './controller/student/favorite.controller';
import { FavoritesSchema } from './schema/favorite.schema';
import { FavoriteService } from './service/favorite/favorite.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adhtanjung:oOWgGDkrduH94gjh@travelio.ioleuxe.mongodb.net/',
      { dbName: 'travelio' },
    ),
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoritesSchema }]),
  ],
  controllers: [AppController, FavoriteController],
  providers: [AppService, FavoriteService],
})
export class AppModule {}
