/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors();

  const config = new DocumentBuilder()
  .setTitle('Documentação Api Blog')
  .setDescription(
    'O Swagger ira lhe auxiliar nos testes de cada endpoint da API.Esta API é para sites com funcionalidade de blog aonde apenas adms podem postar postagens',
  )
  .setVersion('1.0')
  .addTag('home')
  .addTag('users')
  .addTag('posts')
  .addTag('upload')
  .addTag('auth')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
