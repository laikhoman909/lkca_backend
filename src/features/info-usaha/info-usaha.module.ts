import { Module } from '@nestjs/common';
import { InfoUsahaService } from './services/info-usaha.service';
import { InfoUsahaController } from './controllers/info-usaha.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [InfoUsahaController],
  providers: [InfoUsahaService],
  exports: [InfoUsahaService],
})
export class InfoUsahaModule {}
