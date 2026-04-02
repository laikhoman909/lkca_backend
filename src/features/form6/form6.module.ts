import { Module } from '@nestjs/common';
import {
  Form6Controller,
} from './controller/form6.controller';
import { Form6Service } from './service/form6.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form6Controller,
  ],
  providers: [Form6Service],
  exports: [Form6Service],
})
export class Form6Module {}