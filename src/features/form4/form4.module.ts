import { Module } from '@nestjs/common';
import { DbModule } from 'src/core/db/db.module';
import { Form4Controller } from '../form4/controller/form4.controller';
import { Form4Service } from './service/form4.service';

@Module({
  imports: [DbModule],
  controllers: [
    Form4Controller,
  ],
  providers: [Form4Service],
  exports: [Form4Service],
})
export class Form4Module {}