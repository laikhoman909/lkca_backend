import { Module } from '@nestjs/common';
import { DbModule } from 'src/core/db/db.module';
import { Form1Controller } from '../form1/controller/form1.controller';
import { Form1Service } from './service/form1.service';

@Module({
  imports: [DbModule],
  controllers: [
    Form1Controller,
  ],
  providers: [Form1Service],
  exports: [Form1Service],
})
export class Form1Module {}