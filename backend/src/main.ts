import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURATION CORS HYBRIDE ---
  app.enableCors({
    origin: [
      'http://localhost:5173',                // 1. Pour le test local (Prof)
      'https://nestjs-opal-zeta.vercel.app',  // 2. Pour le site en ligne (Vercel)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ---- Swagger config ----
  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('API pour gérer Books, Authors et Categories')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ---- Versionning uniquement pour Swagger (Visuel) ----
  Object.keys(document.paths).forEach((path) => {
    const newPath = `/v1${path}`;
    document.paths[newPath] = document.paths[path];
    delete document.paths[path];
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger docs available at: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();