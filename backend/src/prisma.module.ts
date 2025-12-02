import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // rend Prisma accessible dans tous les modules sans avoir à le réimporter
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
