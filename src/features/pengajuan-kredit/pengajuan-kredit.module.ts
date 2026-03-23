import { Module } from '@nestjs/common';
import { PengajuanKreditService } from './services/pengajuan-kredit.service';
import { PengajuanKreditController } from './controllers/pengajuan-kredit.controller';

@Module({
  controllers: [PengajuanKreditController],
  providers: [PengajuanKreditService],
  exports: [PengajuanKreditService],
})
export class PengajuanKreditModule {}