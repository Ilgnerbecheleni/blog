/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty()
    nickName:string;
    @IsNumber()
    @IsNotEmpty()
    role:number;

}
