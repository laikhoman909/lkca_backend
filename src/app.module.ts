
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { FormModule } from './features/form0/module/form.module';
import { Form1Module } from './features/form1/form1.module';
import { Form2Module } from './features/form2/form2.module';
import { Form3Module } from './features/form3/form3.module';
import { Form4Module } from './features/form4/form4.module';
import { Form5Module } from './features/form5/form5.module';
import { Form6Module } from './features/form6/form6.module';
import { Form7Module } from './features/form7/form7.module';
import { Form8Module } from './features/form8/form8.module';
import { Form9Module } from './features/form9/form9.module';
import { Form10Module } from './features/form10/form10.module';
import { Form11Module } from './features/form11/form11.module';
import { Form12Module } from './features/form12/form12.module';
import { Form13Module } from './features/form13/form13.module';
import { Form14Module } from './features/form14/form14.module';
import { Form15Module } from './features/form15/form15.module';

@Module({
  imports: [
    // Feature modules
    AuthModule,
    FormModule,
    Form1Module,
    Form2Module,
    Form3Module,
    Form4Module,
    Form5Module,
    Form6Module,
    Form7Module,
    Form8Module,
    Form9Module,
    Form10Module,
    Form11Module,
    Form12Module,
    Form13Module,
    Form14Module,
    Form15Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
