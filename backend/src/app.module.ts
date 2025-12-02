import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,      // Prisma global
    AuthorsModule,     // Module Authors
    BookModule,        // Module Books
    CategoryModule,    // Module Categories
    AuthModule,        // Module Auth JWT
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
