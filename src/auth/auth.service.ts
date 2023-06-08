/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { payloadDto } from './dto/payloadDto.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService, private mailerService: MailerService) { }

  async login(login: LoginDTO) {
    const { email, password } = login;

    if(email === process.env.USER_DEFAULT && password===process.env.PASSWORD_DEFAULT){

      const payload: payloadDto = { name: "ADMIN", email: "ADMIM@ADMIM", id: 1 };
      const token = this.jwtService.sign(payload);
      return { acess_token: token }


    }


    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload: payloadDto = { name: user.name, email: email, id: user.id };
    const token = this.jwtService.sign(payload);
    return { acess_token: token }
   
  }

  async reset(email: string) {
    try {
      console.log(email)
      console.log(process.env.USER_EMAIL)

      const user = await this.userService.findByEmail(email);
     
      
      if (!user) {

        throw new BadRequestException("E-mail não encontrado")

      }
      
        console.log(user);
        const {id} = user ;
        const buffer = crypto.randomBytes(4);
        const hash = buffer.toString('hex');
        const updatedemail = await this.userService.updatePassword(id, hash)
        console.log(hash)
        if(!updatedemail){
          throw new BadRequestException("falha ao atualizar senha")
        }
        await this.mailerService.sendMail({
          to: email,
          from: process.env.USER_EMAIL,
          subject: 'Redefinição de senha',
          html: `<h3 style="color: red">Redefinição de senha</h3>
          <p> Sua nova senha é ${hash}</p>
        `,
        });
        return { message: "e-mail enviado" }
        

      

    } catch (error) {
      throw new BadRequestException({ message: "Erro ao resetar a sua senha", erro: error.message })
    }
  }



}
