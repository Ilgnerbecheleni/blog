/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/Auth.guard';

@ApiTags('posts')

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {

    const id = req.user.id;

    return this.postsService.create(createPostDto, id);
  }

  @Get()
  findAll(@Query() skip, @Query() take,) {

    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    const authorId = req.user.id;
    return this.postsService.update(id, updatePostDto, authorId);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
