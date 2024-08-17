import {
  Body,
  Controller,
  DefaultValuePipe,
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
import { ApiQuery } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number default: 1',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page default: 6',
  })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
  ) {
    return this.postsService.getAll({ page, limit });
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
