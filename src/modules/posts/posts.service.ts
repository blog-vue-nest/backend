import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDTO } from './dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private readonly postRepository: typeof Post) {}

    async createPost(dto: CreatePostDTO): Promise<CreatePostDTO> {
        await this.postRepository.create({
            title: dto.title,
            img: dto.img,
            description: dto.description,
            smallDescription: dto.smallDescription
        });
        return dto
    }
}
