import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dto';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiTags('categories')
  @Get('get-all')
  getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.categoriesService.getAll({ page, limit });
  }

  @ApiTags('categories')
  @Get('get-category/:id')
  getPostById(@Param('id') categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @ApiTags('categories')
  @UseGuards(JwtAuthGuard)
  @Patch('update-category/:id')
  updateCategory(
    @Param('id') categoryId: number,
    @Body() dto: CreateCategoryDTO,
  ) {
    return this.categoriesService.updateCategory(categoryId, dto);
  }

  @ApiTags('categories')
  @UseGuards(JwtAuthGuard)
  @Post('create-category')
  createCategory(@Body() dto: CreateCategoryDTO) {
    return this.categoriesService.createCategory(dto);
  }

  @ApiTags('categories')
  @UseGuards(JwtAuthGuard)
  @Delete('delete-category/:id')
  deleteCategory(@Param('id') categoryId: number) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
