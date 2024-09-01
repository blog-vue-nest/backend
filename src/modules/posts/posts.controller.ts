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
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RequestOptions } from 'https';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiTags('posts')
  @Get('get-popular')
  getPopular() {
    return this.postsService.getPopularPosts();
  }

  @ApiTags('posts')
  @Get('get-recent')
  getRecentPosts() {
    return this.postsService.getRecentPosts();
  }

  @ApiTags('posts')
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

  @ApiTags('posts')
  @Get('get-post/:id')
  getPostById(@Param('id') postId: number) {
    return this.postsService.getPostById(postId);
  }

  @ApiTags('posts')
  @UseGuards(JwtAuthGuard)
  @Patch('update-post/:id')
  updateCategory(@Param('id') postId: number, @Body() dto: CreatePostDTO) {
    return this.postsService.updatePost(postId, dto);
  }

  @ApiTags('posts')
  @UseGuards(JwtAuthGuard)
  @Patch('update-post-views/:id')
  updateViews(@Param('id') postId: number) {
    return this.postsService.updateViews(postId);
  }

  @ApiTags('posts')
  @UseGuards(JwtAuthGuard)
  @Post('create-post')
  createPosts(@Body() dto: CreatePostDTO, @Req() req: RequestOptions) {
    return this.postsService.createPost(dto, req);
  }

  @ApiTags('posts')
  @UseGuards(JwtAuthGuard)
  @Delete('delete-post/:id')
  deletePost(@Param('id') postId: number) {
    return this.postsService.deletePost(postId);
  }
}
