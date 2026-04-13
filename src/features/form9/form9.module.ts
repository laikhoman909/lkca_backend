import { Module } from '@nestjs/common';
import {
  Form9Controller,
} from './controller/form9.controller';
import { Form9Service } from './service/form9.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form9Controller,
  ],
  providers: [Form9Service],
  exports: [Form9Service],
})
export class Form9Module {}