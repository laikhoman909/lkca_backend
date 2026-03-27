import { Module } from '@nestjs/common';
import { InfoDebiturBadanUsahaController } from './controllers/info-debitur-badan-usaha.controller';
import { InfoDebiturBadanUsahaService } from './services/info-debitur-badan-usaha.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [InfoDebiturBadanUsahaController],
  providers: [InfoDebiturBadanUsahaService],
  exports: [InfoDebiturBadanUsahaService],
})
export class InfoDebiturBadanUsahaModule {}