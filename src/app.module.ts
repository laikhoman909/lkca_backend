
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { ProductsModule } from './features/products/products.module';
import { PengajuanKreditModule } from './features/pengajuan-kredit/pengajuan-kredit.module';
import { InfoUsahaModule } from './features/info-usaha/info-usaha.module';
import { InfoDebiturModule } from './features/info-debitur/info-debitur.module';
import { DokumenPersyaratanModule } from './features/dokumen-persyaratan/dokumen-persyaratan.module';

@Module({
  imports: [
    // Feature modules
    AuthModule,
    ProductsModule,
    UsersModule,
    PengajuanKreditModule,
    InfoDebiturModule,
    InfoUsahaModule,
    DokumenPersyaratanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
