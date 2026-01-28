import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. AJOUTE CETTE LIGNE OBLIGATOIREMENT
  // C'est elle qui crée vraiment les routes /v1/...
  app.setGlobalPrefix('v1'); 

  // --- CONFIGURATION CORS ---
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173', // Ajoute ça pour Playwright par sécurité
      'https://nestjs-opal-zeta.vercel.app',
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
    .setDescription('API Library')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 2. SUPPRIME TON BLOC "Versionning uniquement pour Swagger"
  // (Le app.setGlobalPrefix('v1') plus haut s'occupe de tout, même de Swagger)

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();