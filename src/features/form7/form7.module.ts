import { Module } from '@nestjs/common';
import {
  Form7Controller,
} from './controller/form7.controller';
import { Form7Service } from './service/form7.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form7Controller,
  ],
  providers: [Form7Service],
  exports: [Form7Service],
})
export class Form7Module {}