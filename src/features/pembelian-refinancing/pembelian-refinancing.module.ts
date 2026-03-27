import { Module } from '@nestjs/common';
import { PembelianRefinancingController } from './controllers/pembelian-refinancing.controller';
import { PembelianRefinancingService } from './services/pembelian-refinancing.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [PembelianRefinancingController],
  providers: [PembelianRefinancingService],
  exports: [PembelianRefinancingService],
})
export class PembelianRefinancingModule {}