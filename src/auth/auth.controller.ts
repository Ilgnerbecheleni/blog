/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './Guards/Auth.guard';

@ApiTags("auth")
@Controller('auth')

export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post('session')
  login(@Body() login: LoginDTO) {
    
    return this.authService.login(login);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('reset')
  reset(@Body() body){
    const { email }= body;
    return this.authService.reset(email);
  }

}
