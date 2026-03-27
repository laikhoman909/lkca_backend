
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { ProductsModule } from './features/products/products.module';
import { PengajuanKreditModule } from './features/pengajuan-kredit/pengajuan-kredit.module';
import { InfoUsahaModule } from './features/info-usaha/info-usaha.module';
import { DokumenPersyaratanModule } from './features/dokumen-persyaratan/dokumen-persyaratan.module';
import { InfoDebiturPribadiModule } from './features/info-debitur-pribadi/info-debitur-pribadi.module';
import { InfoDebiturBadanUsahaModule } from './features/info-debitur-badan-usaha/info-debitur-badan-usaha.module';
import { KonfirmasiTandaTanganModule } from './features/konfirmasi-tanda-tangan/konfirmasi-tanda-tangan.module';
import { KronologisTransaksiModule } from './features/kronologis-transaksi/kronologis-transaksi.module';
import { PembelianRefinancingModule } from './features/pembelian-refinancing/pembelian-refinancing.module';

@Module({
  imports: [
    // Feature modules
    AuthModule,
    ProductsModule,
    UsersModule,
    PengajuanKreditModule,
    InfoDebiturPribadiModule,
    InfoDebiturBadanUsahaModule,
    InfoUsahaModule,
    DokumenPersyaratanModule,
    KonfirmasiTandaTanganModule,
    KronologisTransaksiModule,
    PembelianRefinancingModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
