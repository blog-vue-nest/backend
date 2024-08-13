import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from './models/post.model'

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
