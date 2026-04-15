import { Module } from '@nestjs/common';
import {
  Form12Controller,
} from './controller/form12.controller';
import { Form12Service } from './service/form12.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form12Controller,
  ],
  providers: [Form12Service],
  exports: [Form12Service],
})
export class Form12Module {}