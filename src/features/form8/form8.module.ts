import { Module } from '@nestjs/common';
import {
  Form8Controller,
} from './controller/form8.controller';
import { Form8Service } from './service/form8.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form8Controller,
  ],
  providers: [Form8Service],
  exports: [Form8Service],
})
export class Form8Module {}