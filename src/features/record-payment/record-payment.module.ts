import { Module } from '@nestjs/common';
import { RecordPaymentService } from './services/record-payment.service';
import { RecordPaymentController } from './controllers/record-payment.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [RecordPaymentController],
  providers: [RecordPaymentService],
  exports: [RecordPaymentService],
})
export class RecordPaymentModule {}
