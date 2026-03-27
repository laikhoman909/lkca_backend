import { Module } from '@nestjs/common';
import { KonfirmasiTandaTanganController } from './controllers/konfirmasi-tanda-tangan.controller';
import { KonfirmasiTandaTanganService } from './services/konfirmasi-tanda-tangan.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [KonfirmasiTandaTanganController],
  providers: [KonfirmasiTandaTanganService],
  exports: [KonfirmasiTandaTanganService],
})
export class KonfirmasiTandaTanganModule {}