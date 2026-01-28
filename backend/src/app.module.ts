import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- AJOUTE ÇA
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. On charge les variables d'environnement en Global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ThrottlerModule.forRoot([{
    //   ttl: 60000,
    //   limit: 100,
    // }]),
    PrismaModule,
    AuthorsModule,
    BookModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule { }