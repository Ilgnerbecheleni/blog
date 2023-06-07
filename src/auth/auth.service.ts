/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PayloadDTO } from './dto/payload.dto'
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

    async login(loginDto: LoginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new BadRequestException('Invalid credentials');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new BadRequestException('Invalid credentials');
            }
            const payload:PayloadDTO = {email:email , id:user.id };
            const token = this.jwtService.sign(payload);
            return { acess_token:token}
        }


        catch (err) {
            throw new BadRequestException({ status: "Falha no login", message: err.message })
        }

    }

}
