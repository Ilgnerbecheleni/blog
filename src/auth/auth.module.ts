/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET,
signOptions: { expiresIn: '1d' }
  }),UsersModule,
  MailerModule.forRoot({
    transport: {
      host: process.env.SERVIDOR_EMAIL, //host smtp
      secure: false, //regras de segurança do serviço smtp
      port: 587, // porta
      auth: { //dados do usuário e senha
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
      ignoreTLS: false,
      from: '"Ilgner System" <process.env.USER_EMAIL>',
    },
    defaults: { // configurações que podem ser padrões
      from: 'Sistema Api blog',
    },
  })

],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AuthModule {}
