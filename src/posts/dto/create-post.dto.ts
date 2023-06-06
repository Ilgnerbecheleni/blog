/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
	title: string;

    @IsString()
    @IsNotEmpty()
	content: string;
    @IsString()
    @IsNotEmpty()
    imagem:string;
 
    @IsNumber()
    @IsNotEmpty()
    authorId:number;
    
}
