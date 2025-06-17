import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // for local dev
      'http://hicaretoyprojectbucket.s3-website-us-east-1.amazonaws.com', // S3 bucket
    ],
  });
}
bootstrap();
