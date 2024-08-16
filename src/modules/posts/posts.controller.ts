import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('get-popular')
  getPopular() {
    return this.postsService.getPopularPosts();
  }

  @Get('get-recent')
  getRecentPosts() {
    return this.postsService.getRecentPosts();
  }

  @Get('get-all')
  getAll(@Query('page', ParseIntPipe) page: number = 1) {
    return this.postsService.getAll(page);
  }

  @Get('get-post/:id')
  getPostById(@Param('id') postId: number) {
    return this.postsService.getPostById(postId);
  }

  @Patch('update-post/:id')
  updateCategory(@Param('id') postId: number, @Body() dto: CreatePostDTO) {
    return this.postsService.updatePost(postId, dto);
  }

  @Patch('update-post-views/:id')
  updateViews(@Param('id') postId: number) {
    return this.postsService.updateViews(postId);
  }

  @Post('create-post')
  createPosts(@Body() dto: CreatePostDTO) {
    return this.postsService.createPost(dto);
  }

  @Delete('delete-post/:id')
  deletePost(@Param('id') postId: number) {
    return this.postsService.deletePost(postId);
  }
}
