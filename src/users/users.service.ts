/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'; 
import { requestUserDTO } from './dto/request-user.dto';
@Injectable()
export class UsersService {
 

  constructor(private readonly prisma: PrismaService) { }
  

  
  async findByEmail(email:string):Promise<requestUserDTO> {
    try {
      console.log(email)
      if(!email){
        throw new BadRequestException("E-mail invalido")
      }
      const user:requestUserDTO = await this.prisma.user.findFirst({where:{email:email},select:{
        id:true,
        name:true,
        email:true,
        password:true
      }})
     return user ;
    } catch (error) {
      throw new BadRequestException('Not Found');
    }
  }


  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password, authname } = createUserDto;
      const verify = await this.findByEmail(email);

      if(verify){
        throw new BadRequestException('Email already exist');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password:hash,
          authname,
        }, select: {
          id: true,
          name: true,
        }
      });
      return user;
    } catch (err) {
      throw new BadRequestException({ status: "Falha ao cadastrar usuario", message: err.message })
    }



  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          authname:true,
        }
      });
      return user;

    } catch (err) {
      throw new BadRequestException({ status: "Falha ao buscar usuario", message: err.message })
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
         select: {
          id: true,
          name: true,
          email: true,
          authname:true
        }
      });
      return user;

    } catch (error) {
      throw new BadRequestException("Falha ao buscar usuarios")
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { name, email, password,authname } = updateUserDto;
      const verify = await this.findByEmail(email);

      if(verify){
        throw new BadRequestException('Email already exist');
      }
      const user = await this.prisma.user.update({ where: { id: id }, data: { name, email, password,authname } });
      return user;

    } catch (error) {
      throw new BadRequestException("Falha ao buscar usuarios")
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
