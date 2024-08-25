import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty({ description: 'Category id' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Title en of the post max: 255 characters' })
  @IsString()
  titleEn: string;

  @ApiProperty({ description: 'Title ua of the post max: 255 characters' })
  @IsString()
  titleUa: string;

  @ApiProperty({ description: 'Image' })
  @IsString()
  img: string;

  @ApiProperty({
    description: 'Full description en of the post',
  })
  @IsString()
  descriptionEn: string;

  @ApiProperty({
    description: 'Full description ua of the post',
  })
  @IsString()
  descriptionUa: string;

  @ApiProperty({
    description: 'Small description of the post',
  })
  @IsString()
  smallDescriptionEn: string;

  @ApiProperty({
    description: 'Small description ua of the post',
  })
  @IsString()
  smallDescriptionUa: string;
}
