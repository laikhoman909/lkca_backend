import { Module } from '@nestjs/common';
import {
  PresetsController,
  Form0Controller,
} from '../controller/form.controller';
import { FormService } from '../service/form.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [
    PresetsController,
    Form0Controller,
  ],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}