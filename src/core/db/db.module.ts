import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
      envFilePath: '.env', // Specify path to your .env file
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DbModule {}