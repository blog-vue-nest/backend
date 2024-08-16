import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDTO } from './dto';
import { Category } from '../categories/models/category.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
  ) {}

  getPostById(postId: number): Promise<Post> {
    try {
      return this.postRepository.findByPk(postId, {
        include: [Category],
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(
    page: number,
  ): Promise<{ data: Post[]; quantityPages: number; page: number }> {
    try {
      const limitInPage = 9;
      const offset = (page - 1) * limitInPage;
      const totalPosts = await this.postRepository.count();

      const dataPosts = await this.postRepository.findAll({
        include: [Category],
        limit: limitInPage,
        offset: offset,
      });

      const quantityPages = Math.ceil(totalPosts / limitInPage);

      return {
        data: dataPosts,
        quantityPages: quantityPages,
        page: page,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPost(dto: CreatePostDTO): Promise<{ status: number }> {
    const categoryExists = await Category.findByPk(dto.categoryId);
    if (!categoryExists) {
      throw new Error('Category does not exist');
    }

    try {
      await this.postRepository.create({
        categoryId: dto.categoryId,
        titleEn: dto.titleEn,
        titleUa: dto.titleUa,
        img: dto.img,
        descriptionEn: dto.descriptionEn,
        descriptionUa: dto.descriptionUa,
        smallDescriptionEn: dto.smallDescriptionEn,
        smallDescriptionUa: dto.smallDescriptionUa,
      });
      return { status: 1 };
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

  async updatePost(
    postId: number,
    dto: CreatePostDTO,
  ): Promise<{ status: number }> {
    try {
      await this.postRepository.update(dto, {
        where: { id: postId },
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateViews(postId: number) {
    try {
      const post = await this.postRepository.findByPk(postId);

      await this.postRepository.update(
        {
          views: post.dataValues.views + 1,
        },
        {
          where: { id: postId },
        },
      );
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
