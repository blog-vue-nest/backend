import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({ description: 'Title of the category max: 255 characters' })
  @IsString()
  titleEn: string;

  @ApiProperty({ description: 'Title of the category max: 255 characters' })
  @IsString()
  titleUa: string;
}
