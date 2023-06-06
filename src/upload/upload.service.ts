/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as path from 'path';

@Injectable()
export class UploadService {

async upload(file:Express.Multer.File, path:string){
  
    const result = await writeFile(path,file.buffer) ;
    return {message:"success", "path":path };

}

getImagePath(filename: string): string {
    const imagePath = path.join(__dirname,'..','..','storage','photos', filename);
    return imagePath;
  }

}
