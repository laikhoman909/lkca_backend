import { Module } from '@nestjs/common';
import { InfoUsahaService } from './services/info-usaha.service';
import { InfoUsahaController } from './controllers/info-usaha.controller';

@Module({
  controllers: [InfoUsahaController],
  providers: [InfoUsahaService],
  exports: [InfoUsahaService],
})
export class InfoUsahaModule {}
