import { Module } from '@nestjs/common';
import {
  Form13Controller,
} from './controller/form13.controller';
import { Form13Service } from './service/form13.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form13Controller,
  ],
  providers: [Form13Service],
  exports: [Form13Service],
})
export class Form13Module {}