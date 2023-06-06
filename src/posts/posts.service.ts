/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly prisma: PrismaService) { }
  async verifyUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (user) {
      return true;
    }
    return false;

  }
  async create(createPostDto: CreatePostDto) {
    try {
      const { title, imagem, content, authorId } = createPostDto;
      const verify = await this.verifyUser(authorId);
      if (!verify) {
        throw new BadRequestException('Usuário não existe');
      }
      const post = await this.prisma.post.create({
        data: {
          title,
          imagem,
          content,
          authorId
        }
      });
      return post;

    } catch (err) {
      throw new BadRequestException({ status: "Falha ao criar post", message: err.message })
    }
  }

  async findAll() {
    try {
    
      const user = await this.prisma.post.findMany({include: {
        author: { select: {
          authname: true, // Selecionando apenas o campo name do autor
        }} // Incluindo os dados do usuário (author)
      }});
      return user;
    } catch (err) {
      throw new BadRequestException({ status: "Falha ao buscar usuario", message: err.message })
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findFirst({
        where: { id }
      });
      return post;

    } catch (error) {
      throw new BadRequestException("Falha ao buscar post")
    }
  }

 async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const { title, imagem, content, authorId } = updatePostDto;
      const post = this.findOne(id);
      if (!post) {
        throw new BadRequestException("Post não encontrado");
      }
      const postUpdated = await this.prisma.post.update({where:{id:id},data:{
        title,
        imagem,
        content,
        authorId
      }});
      return postUpdated;
    

    } catch (error) {
      throw new BadRequestException("Falha ao buscar usuarios")
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  
}
