import { Module } from '@nestjs/common';
import {
  Form10Controller,
} from './controller/form10.controller';
import { Form10Service } from './service/form10.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form10Controller,
  ],
  providers: [Form10Service],
  exports: [Form10Service],
})
export class Form10Module {}