import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('create-post')
    createPosts(@Body() dto: CreatePostDTO) {
        console.log(dto);
        return this.postsService.createPost(dto);
    }
}
