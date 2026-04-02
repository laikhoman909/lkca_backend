import { Module } from '@nestjs/common';
import {
  Form5Controller,
} from './controller/form5.controller';
import { Form5Service } from './service/form5.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form5Controller,
  ],
  providers: [Form5Service],
  exports: [Form5Service],
})
export class Form5Module {}