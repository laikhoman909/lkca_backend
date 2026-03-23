
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PrismaService } from 'src/core/db/prisma.service';
import { DbModule } from 'src/core/db/db.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule, // Required for JWT authentication
    JwtModule.register({
      secret: 'JWTSECRE',
      signOptions: { expiresIn: '1h' },
    }),
    DbModule
  ],
  controllers: [ProductsController],
  providers: [ ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
