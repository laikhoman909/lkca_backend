import { Module } from '@nestjs/common';
import { DokumenPersyaratanService } from './services/dokumen-persyaratan.service';
import { DokumenPersyaratanController } from './controllers/dokumen-persyaratan.controller';

@Module({
  controllers: [DokumenPersyaratanController],
  providers: [DokumenPersyaratanService],
  exports: [DokumenPersyaratanService],
})
export class DokumenPersyaratanModule {}
