import { Module } from '@nestjs/common';
import {
  Form15Controller,
} from './controller/form15.controller';
import { Form15Service } from './service/form15.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form15Controller,
  ],
  providers: [Form15Service],
  exports: [Form15Service],
})
export class Form15Module {}