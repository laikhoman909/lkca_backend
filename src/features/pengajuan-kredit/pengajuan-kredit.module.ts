import { Module } from '@nestjs/common';
import { PengajuanKreditService } from './services/pengajuan-kredit.service';
import { PengajuanKreditController } from './controllers/pengajuan-kredit.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [PengajuanKreditController],
  providers: [PengajuanKreditService],
  exports: [PengajuanKreditService],
})
export class PengajuanKreditModule {}