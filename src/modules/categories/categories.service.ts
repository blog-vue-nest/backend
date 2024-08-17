import { Injectable } from '@nestjs/common';
import { Category } from './models/category.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDTO } from './dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import {
  PaginationOptionsDTO,
  PaginationResultDTO,
} from 'src/common/pagination/dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
    private readonly paginationService: PaginationService,
  ) {}

  async getAll(
    paginationOptions: PaginationOptionsDTO,
  ): Promise<PaginationResultDTO<Category>> {
    try {
      const categories = await this.categoryRepository.findAll();

      return this.paginationService.paginate<Category>(
        categories,
        paginationOptions,
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getCategoryById(categoryId: number): Promise<Category> {
    try {
      return this.categoryRepository.findByPk(categoryId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createCategory(dto: CreateCategoryDTO): Promise<{ status: number }> {
    try {
      await this.categoryRepository.create({
        titleEn: dto.titleEn,
        titleUa: dto.titleUa,
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteCategory(categoryId: number): Promise<{ status: number }> {
    try {
      const result = await this.categoryRepository.destroy({
        where: { id: categoryId },
      });

      return { status: result };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCategory(
    categoryId: number,
    dto: CreateCategoryDTO,
  ): Promise<{ status: number }> {
    try {
      await this.categoryRepository.update(dto, {
        where: { id: categoryId },
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
