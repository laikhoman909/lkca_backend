import { Module } from '@nestjs/common';
import { DokumenPersyaratanService } from './services/dokumen-persyaratan.service';
import { DokumenPersyaratanController } from './controllers/dokumen-persyaratan.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [DokumenPersyaratanController],
  providers: [DokumenPersyaratanService],
  exports: [DokumenPersyaratanService],
})
export class DokumenPersyaratanModule {}
