import { Module } from '@nestjs/common';
import { KronologisTransaksiController } from './controllers/kronologis-transaksi.controller';
import { KronologisTransaksiService } from './services/kronologis-transaksi.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [KronologisTransaksiController],
  providers: [KronologisTransaksiService],
  exports: [KronologisTransaksiService],
})
export class KronologisTransaksiModule {}