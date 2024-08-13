import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsArray } from "class-validator";

export class CreatePostDTO {

    @ApiProperty({ description: 'Title of the post max: 255 characters' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Image URLs max: 255 characters' })
    @IsString()
    img: string;

    @ApiProperty({ description: 'Full description of the post max: 255 characters' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Small description of the post max: 255 characters' })
    @IsString()
    smallDescription: string;
}