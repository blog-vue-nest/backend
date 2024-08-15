import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDTO } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
  ) {}

  getAll(): Promise<Post[]> {
    try {
      return this.postRepository.findAll();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPost(dto: CreatePostDTO): Promise<CreatePostDTO> {
    try {
      await this.postRepository.create({
        titleEn: dto.titleEn,
        img: dto.img,
        descriptionEn: dto.descriptionEn,
        smallDescriptionEn: dto.smallDescriptionEn,
      });
      return dto;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deletePost(postId: number): Promise<{ status: number }> {
    try {
      const result = await this.postRepository.destroy({
        where: { id: postId },
      });

      return { status: result };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
