import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty({ description: 'Title of the post max: 255 characters' })
  @IsString()
  titleEn: string;

  @ApiProperty({ description: 'Image URLs max: 255 characters' })
  @IsString()
  img: string;

  @ApiProperty({
    description: 'Full description of the post',
  })
  @IsString()
  descriptionEn: string;

  @ApiProperty({
    description: 'Small description of the post',
  })
  @IsString()
  smallDescriptionEn: string;
}
