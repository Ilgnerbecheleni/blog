/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule),  PostsModule, UploadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {}
