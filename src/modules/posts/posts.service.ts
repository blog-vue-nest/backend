import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDTO } from './dto';
import { Category } from '../categories/models/category.model';
import { PaginationService } from 'src/common/pagination/pagination.service';
import {
  PaginationOptionsDTO,
  PaginationResultDTO,
} from 'src/common/pagination/dto';
import { TokenService } from '../token/token.service';
import { RequestOptions } from 'https';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly paginationService: PaginationService,
    private readonly tokenService: TokenService,
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
    paginationDTO: PaginationOptionsDTO,
  ): Promise<PaginationResultDTO<Post>> {
    try {
      const dataPosts = await this.postRepository.findAll({
        include: [Category],
      });
      return this.paginationService.paginate(dataPosts, paginationDTO);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPost(
    dto: CreatePostDTO,
    request: RequestOptions,
  ): Promise<{ status: number }> {
    const categoryExists = await Category.findByPk(dto.categoryId);
    if (!categoryExists) {
      throw new Error('Category does not exist');
    }

    const decodedToken = await this.tokenService.decodeJwtToken(request);
    const userId = decodedToken.user.id;

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
        userId,
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

  getPopularPosts(): Promise<Post[]> {
    try {
      return this.postRepository.findAll({
        include: [Category],
        order: [['views', 'DESC']],
        limit: 6,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getRecentPosts(): Promise<Post[]> {
    try {
      return this.postRepository.findAll({
        include: [Category],
        order: [['createdAt', 'DESC']],
        limit: 4,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
