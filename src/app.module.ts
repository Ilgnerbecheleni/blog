import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UsersModule, PostsModule, PrismaModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
