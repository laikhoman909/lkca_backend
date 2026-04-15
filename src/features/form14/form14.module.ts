import { Module } from '@nestjs/common';
import {
  Form14Controller,
} from './controller/form14.controller';
import { Form14Service } from './service/form14.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form14Controller,
  ],
  providers: [Form14Service],
  exports: [Form14Service],
})
export class Form14Module {}