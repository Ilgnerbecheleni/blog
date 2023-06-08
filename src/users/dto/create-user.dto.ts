/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
 /**
   * O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir
   * informações da pessoa conectada.
   * @example Fulano silva
   */
    @IsString()
    @IsNotEmpty()
    name:string;
     /**
   * O e-mail é necessário apra o login, para que se possa ser feito as postagens.
   * @example email@email.com
   */
    @IsEmail()
    @IsNotEmpty()
    email:string;
   /**
   * O admin do sistema se conecta com uma senha, mas para login usando o e-mail diretamente
   * é necessário informar uma senha.
   * @example 123@abc
   */
    @IsString()
    @IsNotEmpty()
    password:string;
     /**
   * O id sera utilizado para identificar o author(ADM) da postagem.
   * @example Fulanoxx
   */
    @IsString()
    @IsNotEmpty()
    authname:string;

}
