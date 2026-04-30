// import { PrismaClient } from '@prisma/client';

import { PrismaClient } from "generated/prisma/client";
import { PrismaService } from 'src/core/db/prisma.service';

const prisma = new PrismaService();

async function main() {
  console.log('Seeding predefined KeyValue options...');

  const presets: {
    group: string;
    value: string;
    label: string;
    Description?: string;
    CustomValue: string;
  }[] = [
    // ─── Form0: STATUS CALON DEBITUR ───
    { group: 'StatusCaDeb',value: '0', label: 'RO',                  Description: 'Repeat Order' , CustomValue: ''},
    { group: 'StatusCaDeb',value: '1', label: 'A/O',                 Description: 'Account Officer' , CustomValue: ''},
    { group: 'StatusCaDeb',value: '2', label: 'INVOIC NEW DEBITUR',  Description: 'Invoice New Debtor' , CustomValue: ''},

    // ─── Form0: JENIS PENGAJUAN ───
    { group: 'JenisPengajuan',value: '0', label: 'PEMBELIAN',        Description: 'Pembelian Unit' , CustomValue: ''},
    { group: 'JenisPengajuan',value: '1', label: 'REFINANCING',      Description: 'Refinancing' , CustomValue: ''},
    { group: 'JenisPengajuan',value: '2', label: 'TOP UP',           Description: 'Top Up' , CustomValue: ''},
    { group: 'JenisPengajuan',value: '3', label: 'OVER CREDIT',      Description: 'Over Credit' , CustomValue: ''},

    // ─── Form1: NAMA JELAS SESUAI KTP ───
    { group: 'NamaJelasSesuaiKtp',value: '0', label: 'SESUAI',       Description: 'Nama sesuai KTP' , CustomValue: ''},
    { group: 'NamaJelasSesuaiKtp',value: '1', label: 'TIDAK SESUAI', Description: 'Nama tidak sesuai KTP' , CustomValue: ''},

    // ─── Form1: TEMPAT TINGGAL SESUAI KTP ───
    { group: 'TempatTinggalSesuaiKtp',value: '0', label: 'SESUAI',       Description: 'Tempat tinggal sesuai KTP' , CustomValue: ''},
    { group: 'TempatTinggalSesuaiKtp',value: '1', label: 'TIDAK SESUAI', Description: 'Tempat tinggal tidak sesuai KTP' , CustomValue: ''},

    // ─── Form1: STATUS TEMPAT TINGGAL ───
    { group: 'StatusTempatTinggal',value: '0', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'StatusTempatTinggal',value: '1', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},
    { group: 'StatusTempatTinggal',value: '2', label: 'KELUARGA',      Description: 'Keluarga' , CustomValue: ''},

    // ─── Form1: STATUS PERNIKAHAN ───
    { group: 'StatusPernikahan',value: '0', label: 'MENIKAH',      Description: 'Sudah menikah' , CustomValue: ''},
    { group: 'StatusPernikahan',value: '1', label: 'CERAI HIDUP',  Description: 'Cerai hidup' , CustomValue: ''},

    // ─── Form1: NAMA PASANGAN ───
    { group: 'NamaPasangan',value: '0', label: 'SESUAI',       Description: 'Nama pasangan sesuai' , CustomValue: ''},
    { group: 'NamaPasangan',value: '1', label: 'TIDAK SESUAI', Description: 'Nama pasangan tidak sesuai' , CustomValue: ''},

    // ─── Form1: STATUS ASAL USUL CADEB ───
    { group: 'StatusAsalUsulCadeb',value: '0', label: 'WARGA ASLI',  Description: 'Warga asli setempat' , CustomValue: ''},
    { group: 'StatusAsalUsulCadeb',value: '1', label: 'PENDATANG',   Description: 'Pendatang' , CustomValue: ''},

    // ─── Form1: LAMA TINGGAL ───
    { group: 'LamaTinggal',value: '0', label: '<=3 TH',       Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'LamaTinggal',value: '1', label: '>3 SD 5 TH',   Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},
    { group: 'LamaTinggal',value: '2', label: '>5 TH',         Description: 'Lebih dari 5 tahun' , CustomValue: ''},

    // ─── Form1: JUMLAH TANGGUNGAN ───
    { group: 'JumlahTanggungan',value: '0', label: '1-2 ORG',  Description: '1 sampai 2 orang' , CustomValue: ''},
    { group: 'JumlahTanggungan',value: '1', label: '3-4 ORG',  Description: '3 sampai 4 orang' , CustomValue: ''},
    { group: 'JumlahTanggungan',value: '2', label: '5-6 ORG',  Description: '5 sampai 6 orang' , CustomValue: ''},

    // ─── Form1: STATUS ANAK (SEKOLAH-PEKERJAAN) ───
    { group: 'StatusAnak',value: '0', label: 'TK-SD_1_ORG',       Description: 'TK sampai SD 1 orang' , CustomValue: ''},
    { group: 'StatusAnak',value: '1', label: 'SMP-SMA_1_ORG',     Description: 'SMP sampai SMA 1 orang' , CustomValue: ''},
    { group: 'StatusAnak',value: '2', label: 'KULIAH_ORG',        Description: 'Kuliah' , CustomValue: ''},

    // ─── Form1: PENDIDIKAN TERAKHIR ───
    { group: 'PendidikanTerakhir',value: '0', label: '<=SMA',   Description: 'SMA atau di bawahnya' , CustomValue: ''},
    { group: 'PendidikanTerakhir',value: '1', label: 'D1-S1',   Description: 'Diploma 1 sampai Sarjana' , CustomValue: ''},
    { group: 'PendidikanTerakhir',value: '2', label: '>S1',     Description: 'Di atas Sarjana' , CustomValue: ''},

    // ─── Form1: USIA DEBITUR ───
    { group: 'UsiaDebitur',value: '0', label: '<21 TH',        Description: 'Kurang dari 21 tahun' , CustomValue: ''},
    { group: 'UsiaDebitur',value: '1', label: '>=21-35 TH',    Description: '21 sampai 35 tahun' , CustomValue: ''},
    { group: 'UsiaDebitur',value: '2', label: '>35-55 TH',     Description: 'Lebih dari 35 sampai 55 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: NAMA JELAS SESUAI AKTE ───
    { group: 'BuNamaJelasSesuaiAkte',value: '0', label: 'SESUAI AKTE',      Description: 'Sesuai akte pendirian' , CustomValue: ''},
    { group: 'BuNamaJelasSesuaiAkte',value: '1', label: 'TIDAK SESUAI',     Description: 'Tidak sesuai akte pendirian' , CustomValue: ''},

    // ─── Form1 Badan Usaha: ALAMAT KANTOR ───
    { group: 'BuAlamatKantor',value: '0', label: 'SESUAI AKTE',      Description: 'Alamat sesuai akte' , CustomValue: ''},
    { group: 'BuAlamatKantor',value: '1', label: 'TIDAK SESUAI',     Description: 'Alamat tidak sesuai akte' , CustomValue: ''},

    // ─── Form1 Badan Usaha: STATUS KEPEMILIKAN KANTOR ───
    { group: 'BuStatusKepemilikanKantor',value: '0', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'BuStatusKepemilikanKantor',value: '1', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},

    // ─── Form1 Badan Usaha: LAMA MENEMPATI ───
    { group: 'BuLamaMenempati',value: '0', label: '<=3 TH',      Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'BuLamaMenempati',value: '1', label: '>=3 SD 5 TH', Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: USIA PEMEGANG SAHAM PENGENDALI ───
    { group: 'BuUsiaPemegangSaham',value: '0', label: '<21 TH',      Description: 'Kurang dari 21 tahun' , CustomValue: ''},
    { group: 'BuUsiaPemegangSaham',value: '1', label: '>=21-35 TH',  Description: '21 sampai 35 tahun' , CustomValue: ''},
    { group: 'BuUsiaPemegangSaham',value: '2', label: '>35-55 TH',   Description: 'Lebih dari 35 sampai 55 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: JUMLAH KARYAWAN ───
    { group: 'BuJumlahKaryawan',value: '0', label: '1-2 ORG',  Description: '1 sampai 2 orang' , CustomValue: ''},
    { group: 'BuJumlahKaryawan',value: '1', label: '3-4 ORG',  Description: '3 sampai 4 orang' , CustomValue: ''},
    { group: 'BuJumlahKaryawan',value: '2', label: '5-6 ORG',  Description: '5 sampai 6 orang' , CustomValue: ''},

    // ─── Form5: JENIS TRANSAKSI ───
    { group: 'JenisTransaksi',value: '0', label: 'PEMBELIAN',   Description: 'Pembelian unit baru' , CustomValue: ''},
    { group: 'JenisTransaksi',value: '1', label: 'REFINANCING', Description: 'Refinancing' , CustomValue: ''},
    { group: 'JenisTransaksi',value: '2', label: 'TRADE-IN',    Description: 'Tukar tambah' , CustomValue: ''},
    { group: 'JenisTransaksi',value: '3', label: 'CASH',        Description: 'Tunai' , CustomValue: ''},

    // ─── Form5: MERK/TIPE ───
    { group: 'MerkTipe',value: '0', label: 'SESUAI',       Description: 'Merk/tipe sesuai' , CustomValue: ''},
    { group: 'MerkTipe',value: '1', label: 'TIDAK SESUAI', Description: 'Merk/tipe tidak sesuai' , CustomValue: ''},

    // ─── Form5: BESAR ANGSURAN & TENOR ───
    { group: 'BesarAngsuranTenor',value: '0', label: 'SESUAI',       Description: 'Angsuran & tenor sesuai' , CustomValue: ''},
    { group: 'BesarAngsuranTenor',value: '1', label: 'TIDAK SESUAI', Description: 'Angsuran & tenor tidak sesuai' , CustomValue: ''},

    // ─── Form5: UNIT SUDAH DITERIMA / BELUM ───
    { group: 'UnitSudahDiterima',value: '0', label: 'SUDAH',  Description: 'Unit sudah diterima' , CustomValue: ''},
    { group: 'UnitSudahDiterima',value: '1', label: 'BELUM',  Description: 'Unit belum diterima' , CustomValue: ''},

    // ─── Form6: STATUS DEBITUR ───
    { group: 'StatusDebitur',value: '0', label: 'PEMILIK',   Description: 'Debitur sebagai pemilik' , CustomValue: ''},
    { group: 'StatusDebitur',value: '1', label: 'KARYAWAN',  Description: 'Debitur sebagai karyawan' , CustomValue: ''},

    // ─── Form6: LAMA USAHA / BEKERJA ───
    { group: 'LamaUsaha',value: '0', label: '<=1-3 TH',   Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'LamaUsaha',value: '1', label: '>3-5 TH',    Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},

    // ─── Form6: STATUS KEPEMILIKAN TEMPAT USAHA ───
    { group: 'StatusKepemilikanTempat',value: '0', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'StatusKepemilikanTempat',value: '1', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},

    // ─── Form6: JARAK TEMPAT USAHA VS RUMAH ───
    { group: 'JarakTempat',value: '0', label: '<=30 KM',  Description: 'Jarak kurang dari atau sama dengan 30 KM' , CustomValue: ''},
    { group: 'JarakTempat',value: '1', label: '>30 KM',   Description: 'Jarak lebih dari 30 KM' , CustomValue: ''},

    // ─── Form6: PEMBAYARAN GAJI (KHUSUS KARYAWAN) ───
    { group: 'PembayaranGaji',value: '0', label: 'TRANSFER', Description: 'Pembayaran via transfer' , CustomValue: ''},
    { group: 'PembayaranGaji',value: '1', label: 'TUNAI',    Description: 'Pembayaran tunai' , CustomValue: ''},

    // ─── Form6: STATUS KARYAWAN ───
    { group: 'StatusKaryawan',value: '0', label: 'TETAP',    Description: 'Karyawan tetap' , CustomValue: ''},
    { group: 'StatusKaryawan',value: '1', label: 'KONTRAK',  Description: 'Karyawan kontrak' , CustomValue: ''},

    // ─── Form3: KONFIRMASI TANDA TANGAN KONTRAK ───
    { group: 'TandaTangan',value: '0', label: 'SUDAH',       Description: '' , CustomValue: ''},
    { group: 'TandaTangan',value: '1', label: 'BELUM',       Description: '' , CustomValue: ''},
    { group: 'Penjelasan',value: '0', label: 'SUDAH', Description: '' , CustomValue: ''},
    { group: 'Penjelasan',value: '1', label: 'BELUM', Description: '' , CustomValue: ''},
    { group: 'NamaCMO',value: '0', label: 'SUDAH', Description: '' , CustomValue: ''},
    { group: 'NamaCMO',value: '1', label: 'BELUM', Description: '' , CustomValue: ''},

    // ─── Form4: KONFIRMASI KRONOLOGIS TRANSAKSI ───
    { group: 'Mengetahui',value: '0', label: 'TEMAN',       Description: '' , CustomValue: ''},
    { group: 'NamaDealer',value: '0', label: 'SESUAI',       Description: '' , CustomValue: ''},
    { group: 'NamaDealer',value: '1', label: 'TIDAK',       Description: '' , CustomValue: ''},
    { group: 'Tujuan',value: '0', label: 'USAHA', Description: '' , CustomValue: ''},
    { group: 'Tujuan',value: '1', label: 'PRIBADI', Description: '' , CustomValue: ''},
    { group: 'KendaraanDibawa',value: '0', label: 'DEBITUR', Description: '' , CustomValue: ''},
    { group: 'KendaraanDibawa',value: '1', label: 'PASANGAN', Description: '' , CustomValue: ''},
    { group: 'PembawaKendaraan',value: '0', label: 'ADA', Description: '' , CustomValue: ''},
    { group: 'PembawaKendaraan',value: '1', label: 'TIDAK', Description: '' , CustomValue: ''},
    { group: 'SudahCek',value: '0', label: 'SUDAH', Description: '' , CustomValue: ''},
    { group: 'SudahCek',value: '1', label: 'BELUM', Description: '' , CustomValue: ''},
    
  ];

  for (const preset of presets) {
    await prisma.keyValue.upsert({
      where: {
        group_value_CustomValue: {
          group: preset.group,
          value: preset.value,
          CustomValue: preset.CustomValue
        }
      },
      update: {},
      create: {
        group: preset.group,
        value: preset.value,
        label: preset.label,
        Description: preset.Description ?? null,
        CustomValue: preset.CustomValue,
        isPreset: true,
      },
    });
  }

  console.log(`Seeded ${presets.length} predefined KeyValue options.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });