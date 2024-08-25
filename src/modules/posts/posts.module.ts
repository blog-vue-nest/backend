import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), PaginationModule, TokenModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
