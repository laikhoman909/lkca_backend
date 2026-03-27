import { Module } from '@nestjs/common';
import { MutasiRekeningService } from './services/mutasi-rekening.service';
import { MutasiRekeningController } from './controllers/mutasi-rekening.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [MutasiRekeningController],
  providers: [MutasiRekeningService],
  exports: [MutasiRekeningService],
})
export class MutasiRekeningModule {}
