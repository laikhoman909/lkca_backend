import { Module } from '@nestjs/common';
import {
  Form11Controller,
} from './controller/form11.controller';
import { Form11Service } from './service/form11.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    Form11Controller,
  ],
  providers: [Form11Service],
  exports: [Form11Service],
})
export class Form11Module {}