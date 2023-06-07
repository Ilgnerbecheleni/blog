/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')

export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post('session')
  login(@Body() login: LoginDTO) {
    
    return this.authService.login(login);
  }

}
