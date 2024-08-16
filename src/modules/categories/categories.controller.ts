import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('get-all')
  getAll() {
    return this.categoriesService.getAll();
  }

  @Get('get-category/:id')
  getPostById(@Param('id') categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Patch('update-category/:id')
  updateCategory(
    @Param('id') categoryId: number,
    @Body() dto: CreateCategoryDTO,
  ) {
    return this.categoriesService.updateCategory(categoryId, dto);
  }

  @Post('create-category')
  createCategory(@Body() dto: CreateCategoryDTO) {
    return this.categoriesService.createCategory(dto);
  }

  @Delete('delete-category/:id')
  deleteCategory(@Param('id') categoryId: number) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
