/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
export class CreatePostDto {
 /**
   * O título da postagem.
   * @example Title1
   */
    @IsString()
    @IsNotEmpty()
	title: string;
/**
   * O conteudo da postagem vai nesse campos
   * 
   * @example Fulano silva
   */
    @IsString()
    @IsNotEmpty()
	content: string;
     /**
   * A imagem da psotagem do blog.
   * @example Imagem da postagem
   */
    @IsString()
    @IsNotEmpty()
    imagem:string;
 
 
    
}
