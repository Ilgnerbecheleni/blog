/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { payloadDto } from './dto/payloadDto.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
 
 constructor (private readonly jwtService:JwtService,private readonly userService:UsersService){}
 
  async login(login: LoginDTO) {
    const {email,password}= login;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
  }
  const payload:payloadDto = {name:user.name, email:email , id:user.id };
  const token = this.jwtService.sign(payload);
  return { acess_token:token}
    return user;
  }

 
}
