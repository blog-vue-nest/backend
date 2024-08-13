import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('get-all')
    getAll() {
        return this.postsService.getAll();
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
