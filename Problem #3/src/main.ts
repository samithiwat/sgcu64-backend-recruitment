import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { OfficerInfo } from './officers/officers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('SGCU API Docs')
    .setDescription('Doc for SGCU company')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('auth')
    .addTag('officers')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [OfficerInfo],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
