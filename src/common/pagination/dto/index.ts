import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationOptionsDTO {
  @ApiProperty({ description: 'paginate to page' })
  @IsInt()
  page: number;

  @ApiProperty({ description: 'limit elements on page' })
  @IsInt()
  limit: number;
}

export class PaginationMetaDTO {
  @IsInt()
  totalItems: number;

  @IsInt()
  itemCount: number;

  @IsInt()
  itemsPerPage: number;

  @IsInt()
  totalPages: number;

  @IsInt()
  currentPage: number;
}

export class PaginationResultDTO<T> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  items: T[];

  @ValidateNested()
  @Type(() => PaginationMetaDTO)
  meta: PaginationMetaDTO;
}
