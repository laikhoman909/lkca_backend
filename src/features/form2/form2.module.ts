import { Module } from '@nestjs/common';
import { Form2Service } from './services/form2.service';
import { Form2Controller } from './controllers/form2.controller';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [Form2Controller],
  providers: [Form2Service],
  exports: [Form2Service],
})
export class Form2Module {}
