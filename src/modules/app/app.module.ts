import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from 'src/configurations';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../posts/models/post.model';
import { PostsModule } from '../posts/posts.module';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/models/category.model';
import { User } from '../users/models/user.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PostsModule,
    CategoriesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        database: configService.get('db_database'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        synchronize: false,
        models: [Post, Category, User],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
