/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
constructor (private readonly uploadService:UploadService){}

@UseInterceptors(FileInterceptor('file'))
@Post()
async uploadPhoto(@UploadedFile() file:Express.Multer.File){
    const path = join(__dirname,'..','..','storage','photos','img.png') ;
   
    return this.uploadService.upload(file, path);

}

@Get(':filename')
async getImage(@Param('filename') filename: string, @Res() res: Response) {
  const path = await this.uploadService.getImagePath(filename);
  res.sendFile(path);
}

}
