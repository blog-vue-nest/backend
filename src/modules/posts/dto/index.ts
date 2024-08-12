import { IsString,IsArray } from "class-validator";

export class CreatePostDTO {
    @IsString()
    title: string;

    @IsString()
    img: string;

    @IsString()
    description: string;

    @IsString()
    smallDescription: string;
}