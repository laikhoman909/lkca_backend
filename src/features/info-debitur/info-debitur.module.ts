import { Module } from '@nestjs/common';
import { InfoDebiturService } from './services/info-debitur.service';
import { InfoDebiturController } from './controllers/info-debitur.controller';

@Module({
  controllers: [InfoDebiturController],
  providers: [InfoDebiturService],
  exports: [InfoDebiturService],
})
export class InfoDebiturModule {}
