import { Module } from '@nestjs/common';
import { DbModule } from 'src/core/db/db.module';
import { Form3Controller } from '../form3/controller/form3.controller';
import { Form3Service } from './service/form3.service';

@Module({
  imports: [DbModule],
  controllers: [
    Form3Controller,
  ],
  providers: [Form3Service],
  exports: [Form3Service],
})
export class Form3Module {}