import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsArray } from "class-validator";

export class CreatePostDTO {

    @ApiProperty({ description: 'Title of the post' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Image URLs' })
    @IsString()
    img: string;

    @ApiProperty({ description: 'Full description of the post' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Small description of the post' })
    @IsString()
    smallDescription: string;
}