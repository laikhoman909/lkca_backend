
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { ProductsModule } from './features/products/products.module';
// import { PengajuanKreditModule } from './features/pengajuan-kredit/pengajuan-kredit.module';
// import { InfoUsahaModule } from './features/info-usaha/info-usaha.module';
// import { DokumenPersyaratanModule } from './features/dokumen-persyaratan/dokumen-persyaratan.module';
// import { InfoDebiturPribadiModule } from './features/info-debitur-pribadi/info-debitur-pribadi.module';
// import { InfoDebiturBadanUsahaModule } from './features/info-debitur-badan-usaha/info-debitur-badan-usaha.module';
// import { KonfirmasiTandaTanganModule } from './features/konfirmasi-tanda-tangan/konfirmasi-tanda-tangan.module';
// import { KronologisTransaksiModule } from './features/kronologis-transaksi/kronologis-transaksi.module';
// import { PembelianRefinancingModule } from './features/pembelian-refinancing/pembelian-refinancing.module';
// import { MutasiRekeningModule } from './features/mutasi-rekening/mutasi-rekening.module';
// import { RecordPaymentModule } from './features/record-payment/record-payment.module';
import { FormModule } from './features/form0/module/form.module';
import { Form1Module } from './features/form1/form1.module';
import { Form2Module } from './features/form2/form2.module';
import { Form3Module } from './features/form3/form3.module';
import { Form4Module } from './features/form4/form4.module';

@Module({
  imports: [
    // Feature modules
    AuthModule,
    ProductsModule,
    UsersModule,
    // PengajuanKreditModule,
    // InfoDebiturPribadiModule,
    // InfoDebiturBadanUsahaModule,
    // DokumenPersyaratanModule,
    // KonfirmasiTandaTanganModule,
    // KronologisTransaksiModule,
    // InfoUsahaModule,
    // PembelianRefinancingModule,
    // MutasiRekeningModule,
    // RecordPaymentModule,

    FormModule,
    Form1Module,
    Form2Module,
    Form3Module,
    Form4Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
