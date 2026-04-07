// import { PrismaClient } from '@prisma/client';

import { PrismaClient } from "generated/prisma/client";
import { PrismaService } from 'src/core/db/prisma.service';

const prisma = new PrismaService();

async function main() {
  console.log('Seeding predefined KeyValue options...');

  const presets: {
    group: string;
    label: string;
    Description?: string;
    CustomValue: string;
  }[] = [
    // ─── Form0: STATUS CALON DEBITUR ───
    { group: 'StatusCaDeb', label: 'RO',                  Description: 'Repeat Order' , CustomValue: ''},
    { group: 'StatusCaDeb', label: 'A/O',                 Description: 'Account Officer' , CustomValue: ''},
    { group: 'StatusCaDeb', label: 'INVOIC NEW DEBITUR',  Description: 'Invoice New Debtor' , CustomValue: ''},

    // ─── Form0: JENIS PENGAJUAN ───
    { group: 'JenisPengajuan', label: 'PEMBELIAN',        Description: 'Pembelian Unit' , CustomValue: ''},
    { group: 'JenisPengajuan', label: 'REFINANCING',      Description: 'Refinancing' , CustomValue: ''},
    { group: 'JenisPengajuan', label: 'TOP UP',           Description: 'Top Up' , CustomValue: ''},
    { group: 'JenisPengajuan', label: 'OVER CREDIT',      Description: 'Over Credit' , CustomValue: ''},

    // ─── Form1: NAMA JELAS SESUAI KTP ───
    { group: 'NamaJelasSesuaiKtp', label: 'SESUAI',       Description: 'Nama sesuai KTP' , CustomValue: ''},
    { group: 'NamaJelasSesuaiKtp', label: 'TIDAK SESUAI', Description: 'Nama tidak sesuai KTP' , CustomValue: ''},

    // ─── Form1: TEMPAT TINGGAL SESUAI KTP ───
    { group: 'TempatTinggalSesuaiKtp', label: 'SESUAI',       Description: 'Tempat tinggal sesuai KTP' , CustomValue: ''},
    { group: 'TempatTinggalSesuaiKtp', label: 'TIDAK SESUAI', Description: 'Tempat tinggal tidak sesuai KTP' , CustomValue: ''},

    // ─── Form1: STATUS TEMPAT TINGGAL ───
    { group: 'StatusTempatTinggal', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'StatusTempatTinggal', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},
    { group: 'StatusTempatTinggal', label: 'KELUARGA',      Description: 'Keluarga' , CustomValue: ''},

    // ─── Form1: STATUS PERNIKAHAN ───
    { group: 'StatusPernikahan', label: 'MENIKAH',      Description: 'Sudah menikah' , CustomValue: ''},
    { group: 'StatusPernikahan', label: 'CERAI HIDUP',  Description: 'Cerai hidup' , CustomValue: ''},

    // ─── Form1: NAMA PASANGAN ───
    { group: 'NamaPasangan', label: 'SESUAI',       Description: 'Nama pasangan sesuai' , CustomValue: ''},
    { group: 'NamaPasangan', label: 'TIDAK SESUAI', Description: 'Nama pasangan tidak sesuai' , CustomValue: ''},

    // ─── Form1: STATUS ASAL USUL CADEB ───
    { group: 'StatusAsalUsulCadeb', label: 'WARGA ASLI',  Description: 'Warga asli setempat' , CustomValue: ''},
    { group: 'StatusAsalUsulCadeb', label: 'PENDATANG',   Description: 'Pendatang' , CustomValue: ''},

    // ─── Form1: LAMA TINGGAL ───
    { group: 'LamaTinggal', label: '<=3 TH',       Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'LamaTinggal', label: '>3 SD 5 TH',   Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},
    { group: 'LamaTinggal', label: '>5 TH',         Description: 'Lebih dari 5 tahun' , CustomValue: ''},

    // ─── Form1: JUMLAH TANGGUNGAN ───
    { group: 'JumlahTanggungan', label: '1-2 ORG',  Description: '1 sampai 2 orang' , CustomValue: ''},
    { group: 'JumlahTanggungan', label: '3-4 ORG',  Description: '3 sampai 4 orang' , CustomValue: ''},
    { group: 'JumlahTanggungan', label: '5-6 ORG',  Description: '5 sampai 6 orang' , CustomValue: ''},

    // ─── Form1: STATUS ANAK (SEKOLAH-PEKERJAAN) ───
    { group: 'StatusAnak', label: 'TK-SD_1_ORG',       Description: 'TK sampai SD 1 orang' , CustomValue: ''},
    { group: 'StatusAnak', label: 'SMP-SMA_1_ORG',     Description: 'SMP sampai SMA 1 orang' , CustomValue: ''},
    { group: 'StatusAnak', label: 'KULIAH_ORG',        Description: 'Kuliah' , CustomValue: ''},

    // ─── Form1: PENDIDIKAN TERAKHIR ───
    { group: 'PendidikanTerakhir', label: '<=SMA',   Description: 'SMA atau di bawahnya' , CustomValue: ''},
    { group: 'PendidikanTerakhir', label: 'D1-S1',   Description: 'Diploma 1 sampai Sarjana' , CustomValue: ''},
    { group: 'PendidikanTerakhir', label: '>S1',     Description: 'Di atas Sarjana' , CustomValue: ''},

    // ─── Form1: USIA DEBITUR ───
    { group: 'UsiaDebitur', label: '<21 TH',        Description: 'Kurang dari 21 tahun' , CustomValue: ''},
    { group: 'UsiaDebitur', label: '>=21-35 TH',    Description: '21 sampai 35 tahun' , CustomValue: ''},
    { group: 'UsiaDebitur', label: '>35-55 TH',     Description: 'Lebih dari 35 sampai 55 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: NAMA JELAS SESUAI AKTE ───
    { group: 'BuNamaJelasSesuaiAkte', label: 'SESUAI AKTE',      Description: 'Sesuai akte pendirian' , CustomValue: ''},
    { group: 'BuNamaJelasSesuaiAkte', label: 'TIDAK SESUAI',     Description: 'Tidak sesuai akte pendirian' , CustomValue: ''},

    // ─── Form1 Badan Usaha: ALAMAT KANTOR ───
    { group: 'BuAlamatKantor', label: 'SESUAI AKTE',      Description: 'Alamat sesuai akte' , CustomValue: ''},
    { group: 'BuAlamatKantor', label: 'TIDAK SESUAI',     Description: 'Alamat tidak sesuai akte' , CustomValue: ''},

    // ─── Form1 Badan Usaha: STATUS KEPEMILIKAN KANTOR ───
    { group: 'BuStatusKepemilikanKantor', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'BuStatusKepemilikanKantor', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},

    // ─── Form1 Badan Usaha: LAMA MENEMPATI ───
    { group: 'BuLamaMenempati', label: '<=3 TH',      Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'BuLamaMenempati', label: '>=3 SD 5 TH', Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: USIA PEMEGANG SAHAM PENGENDALI ───
    { group: 'BuUsiaPemegangSaham', label: '<21 TH',      Description: 'Kurang dari 21 tahun' , CustomValue: ''},
    { group: 'BuUsiaPemegangSaham', label: '>=21-35 TH',  Description: '21 sampai 35 tahun' , CustomValue: ''},
    { group: 'BuUsiaPemegangSaham', label: '>35-55 TH',   Description: 'Lebih dari 35 sampai 55 tahun' , CustomValue: ''},

    // ─── Form1 Badan Usaha: JUMLAH KARYAWAN ───
    { group: 'BuJumlahKaryawan', label: '1-2 ORG',  Description: '1 sampai 2 orang' , CustomValue: ''},
    { group: 'BuJumlahKaryawan', label: '3-4 ORG',  Description: '3 sampai 4 orang' , CustomValue: ''},
    { group: 'BuJumlahKaryawan', label: '5-6 ORG',  Description: '5 sampai 6 orang' , CustomValue: ''},

    // ─── Form5: JENIS TRANSAKSI ───
    { group: 'JenisTransaksi', label: 'PEMBELIAN',   Description: 'Pembelian unit baru' , CustomValue: ''},
    { group: 'JenisTransaksi', label: 'REFINANCING', Description: 'Refinancing' , CustomValue: ''},
    { group: 'JenisTransaksi', label: 'TRADE-IN',    Description: 'Tukar tambah' , CustomValue: ''},
    { group: 'JenisTransaksi', label: 'CASH',        Description: 'Tunai' , CustomValue: ''},

    // ─── Form5: MERK/TIPE ───
    { group: 'MerkTipe', label: 'SESUAI',       Description: 'Merk/tipe sesuai' , CustomValue: ''},
    { group: 'MerkTipe', label: 'TIDAK SESUAI', Description: 'Merk/tipe tidak sesuai' , CustomValue: ''},

    // ─── Form5: BESAR ANGSURAN & TENOR ───
    { group: 'BesarAngsuranTenor', label: 'SESUAI',       Description: 'Angsuran & tenor sesuai' , CustomValue: ''},
    { group: 'BesarAngsuranTenor', label: 'TIDAK SESUAI', Description: 'Angsuran & tenor tidak sesuai' , CustomValue: ''},

    // ─── Form5: UNIT SUDAH DITERIMA / BELUM ───
    { group: 'UnitSudahDiterima', label: 'SUDAH',  Description: 'Unit sudah diterima' , CustomValue: ''},
    { group: 'UnitSudahDiterima', label: 'BELUM',  Description: 'Unit belum diterima' , CustomValue: ''},

    // ─── Form6: STATUS DEBITUR ───
    { group: 'StatusDebitur', label: 'PEMILIK',   Description: 'Debitur sebagai pemilik' , CustomValue: ''},
    { group: 'StatusDebitur', label: 'KARYAWAN',  Description: 'Debitur sebagai karyawan' , CustomValue: ''},

    // ─── Form6: LAMA USAHA / BEKERJA ───
    { group: 'LamaUsaha', label: '<=1-3 TH',   Description: 'Kurang dari atau sama dengan 3 tahun' , CustomValue: ''},
    { group: 'LamaUsaha', label: '>3-5 TH',    Description: 'Lebih dari 3 sampai 5 tahun' , CustomValue: ''},

    // ─── Form6: STATUS KEPEMILIKAN TEMPAT USAHA ───
    { group: 'StatusKepemilikanTempat', label: 'MILIK SENDIRI', Description: 'Milik sendiri' , CustomValue: ''},
    { group: 'StatusKepemilikanTempat', label: 'SEWA',          Description: 'Sewa' , CustomValue: ''},

    // ─── Form6: JARAK TEMPAT USAHA VS RUMAH ───
    { group: 'JarakTempat', label: '<=30 KM',  Description: 'Jarak kurang dari atau sama dengan 30 KM' , CustomValue: ''},
    { group: 'JarakTempat', label: '>30 KM',   Description: 'Jarak lebih dari 30 KM' , CustomValue: ''},

    // ─── Form6: PEMBAYARAN GAJI (KHUSUS KARYAWAN) ───
    { group: 'PembayaranGaji', label: 'TRANSFER', Description: 'Pembayaran via transfer' , CustomValue: ''},
    { group: 'PembayaranGaji', label: 'TUNAI',    Description: 'Pembayaran tunai' , CustomValue: ''},

    // ─── Form6: STATUS KARYAWAN ───
    { group: 'StatusKaryawan', label: 'TETAP',    Description: 'Karyawan tetap' , CustomValue: ''},
    { group: 'StatusKaryawan', label: 'KONTRAK',  Description: 'Karyawan kontrak' , CustomValue: ''},
  ];

  for (const preset of presets) {
    await prisma.keyValue.upsert({
      where: {
        group_label_CustomValue: {
          group: preset.group,
          label: preset.label,
          CustomValue: preset.CustomValue
        }
      },
      update: {},
      create: {
        group: preset.group,
        label: preset.label,
        Description: preset.Description ?? null,
        CustomValue: null,
        isPreset: true,
        isSelected: false,
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