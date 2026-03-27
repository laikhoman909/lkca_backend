import { Module } from '@nestjs/common';
import { InfoDebiturPribadiController } from './controllers/info-debitur-pribadi.controller';
import { InfoDebiturPribadiService } from './services/info-debitur-pribadi.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [InfoDebiturPribadiController],
  providers: [InfoDebiturPribadiService],
  exports: [InfoDebiturPribadiService],
})
export class InfoDebiturPribadiModule {}