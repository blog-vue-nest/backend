import { Injectable } from '@nestjs/common';
import { PaginationOptionsDTO, PaginationResultDTO } from './dto';

@Injectable()
export class PaginationService {
  paginate<T>(
    data: T[],
    options: PaginationOptionsDTO,
  ): PaginationResultDTO<T> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;
    const paginatedItems = data.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      meta: {
        totalItems: data.length,
        itemCount: paginatedItems.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(data.length / limit),
        currentPage: page,
      },
    };
  }
}
