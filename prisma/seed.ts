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
  }[] = [
    // ─── Form0: STATUS CALON DEBITUR ───
    { group: 'StatusCaDeb', label: 'RO',                  Description: 'Repeat Order' },
    { group: 'StatusCaDeb', label: 'A/O',                 Description: 'Account Officer' },
    { group: 'StatusCaDeb', label: 'INVOIC NEW DEBITUR',  Description: 'Invoice New Debtor' },

    // ─── Form0: JENIS PENGAJUAN ───
    { group: 'JenisPengajuan', label: 'PEMBELIAN',        Description: 'Pembelian Unit' },
    { group: 'JenisPengajuan', label: 'REFINANCING',      Description: 'Refinancing' },
    { group: 'JenisPengajuan', label: 'TOP UP',           Description: 'Top Up' },
    { group: 'JenisPengajuan', label: 'OVER CREDIT',      Description: 'Over Credit' },

    // ─── Form1: NAMA JELAS SESUAI KTP ───
    { group: 'NamaJelasSesuaiKtp', label: 'SESUAI',       Description: 'Nama sesuai KTP' },
    { group: 'NamaJelasSesuaiKtp', label: 'TIDAK SESUAI', Description: 'Nama tidak sesuai KTP' },

    // ─── Form1: TEMPAT TINGGAL SESUAI KTP ───
    { group: 'TempatTinggalSesuaiKtp', label: 'SESUAI',       Description: 'Tempat tinggal sesuai KTP' },
    { group: 'TempatTinggalSesuaiKtp', label: 'TIDAK SESUAI', Description: 'Tempat tinggal tidak sesuai KTP' },

    // ─── Form1: STATUS TEMPAT TINGGAL ───
    { group: 'StatusTempatTinggal', label: 'MILIK SENDIRI', Description: 'Milik sendiri' },
    { group: 'StatusTempatTinggal', label: 'SEWA',          Description: 'Sewa' },
    { group: 'StatusTempatTinggal', label: 'KELUARGA',      Description: 'Keluarga' },

    // ─── Form1: STATUS PERNIKAHAN ───
    { group: 'StatusPernikahan', label: 'MENIKAH',      Description: 'Sudah menikah' },
    { group: 'StatusPernikahan', label: 'CERAI HIDUP',  Description: 'Cerai hidup' },

    // ─── Form1: NAMA PASANGAN ───
    { group: 'NamaPasangan', label: 'SESUAI',       Description: 'Nama pasangan sesuai' },
    { group: 'NamaPasangan', label: 'TIDAK SESUAI', Description: 'Nama pasangan tidak sesuai' },

    // ─── Form1: STATUS ASAL USUL CADEB ───
    { group: 'StatusAsalUsulCadeb', label: 'WARGA ASLI',  Description: 'Warga asli setempat' },
    { group: 'StatusAsalUsulCadeb', label: 'PENDATANG',   Description: 'Pendatang' },

    // ─── Form1: LAMA TINGGAL ───
    { group: 'LamaTinggal', label: '<=3 TH',       Description: 'Kurang dari atau sama dengan 3 tahun' },
    { group: 'LamaTinggal', label: '>3 SD 5 TH',   Description: 'Lebih dari 3 sampai 5 tahun' },
    { group: 'LamaTinggal', label: '>5 TH',         Description: 'Lebih dari 5 tahun' },

    // ─── Form1: JUMLAH TANGGUNGAN ───
    { group: 'JumlahTanggungan', label: '1-2 ORG',  Description: '1 sampai 2 orang' },
    { group: 'JumlahTanggungan', label: '3-4 ORG',  Description: '3 sampai 4 orang' },
    { group: 'JumlahTanggungan', label: '5-6 ORG',  Description: '5 sampai 6 orang' },

    // ─── Form1: STATUS ANAK (SEKOLAH-PEKERJAAN) ───
    { group: 'StatusAnak', label: 'TK-SD_1_ORG',       Description: 'TK sampai SD 1 orang' },
    { group: 'StatusAnak', label: 'SMP-SMA_1_ORG',     Description: 'SMP sampai SMA 1 orang' },
    { group: 'StatusAnak', label: 'KULIAH_ORG',        Description: 'Kuliah' },

    // ─── Form1: PENDIDIKAN TERAKHIR ───
    { group: 'PendidikanTerakhir', label: '<=SMA',   Description: 'SMA atau di bawahnya' },
    { group: 'PendidikanTerakhir', label: 'D1-S1',   Description: 'Diploma 1 sampai Sarjana' },
    { group: 'PendidikanTerakhir', label: '>S1',     Description: 'Di atas Sarjana' },

    // ─── Form1: USIA DEBITUR ───
    { group: 'UsiaDebitur', label: '<21 TH',        Description: 'Kurang dari 21 tahun' },
    { group: 'UsiaDebitur', label: '>=21-35 TH',    Description: '21 sampai 35 tahun' },
    { group: 'UsiaDebitur', label: '>35-55 TH',     Description: 'Lebih dari 35 sampai 55 tahun' },

    // ─── Form1 Badan Usaha: NAMA JELAS SESUAI AKTE ───
    { group: 'BuNamaJelasSesuaiAkte', label: 'SESUAI AKTE',      Description: 'Sesuai akte pendirian' },
    { group: 'BuNamaJelasSesuaiAkte', label: 'TIDAK SESUAI',     Description: 'Tidak sesuai akte pendirian' },

    // ─── Form1 Badan Usaha: ALAMAT KANTOR ───
    { group: 'BuAlamatKantor', label: 'SESUAI AKTE',      Description: 'Alamat sesuai akte' },
    { group: 'BuAlamatKantor', label: 'TIDAK SESUAI',     Description: 'Alamat tidak sesuai akte' },

    // ─── Form1 Badan Usaha: STATUS KEPEMILIKAN KANTOR ───
    { group: 'BuStatusKepemilikanKantor', label: 'MILIK SENDIRI', Description: 'Milik sendiri' },
    { group: 'BuStatusKepemilikanKantor', label: 'SEWA',          Description: 'Sewa' },

    // ─── Form1 Badan Usaha: LAMA MENEMPATI ───
    { group: 'BuLamaMenempati', label: '<=3 TH',      Description: 'Kurang dari atau sama dengan 3 tahun' },
    { group: 'BuLamaMenempati', label: '>=3 SD 5 TH', Description: 'Lebih dari 3 sampai 5 tahun' },

    // ─── Form1 Badan Usaha: USIA PEMEGANG SAHAM PENGENDALI ───
    { group: 'BuUsiaPemegangSaham', label: '<21 TH',      Description: 'Kurang dari 21 tahun' },
    { group: 'BuUsiaPemegangSaham', label: '>=21-35 TH',  Description: '21 sampai 35 tahun' },
    { group: 'BuUsiaPemegangSaham', label: '>35-55 TH',   Description: 'Lebih dari 35 sampai 55 tahun' },

    // ─── Form1 Badan Usaha: JUMLAH KARYAWAN ───
    { group: 'BuJumlahKaryawan', label: '1-2 ORG',  Description: '1 sampai 2 orang' },
    { group: 'BuJumlahKaryawan', label: '3-4 ORG',  Description: '3 sampai 4 orang' },
    { group: 'BuJumlahKaryawan', label: '5-6 ORG',  Description: '5 sampai 6 orang' },

    // ─── Form5: JENIS TRANSAKSI ───
    { group: 'JenisTransaksi', label: 'PEMBELIAN',   Description: 'Pembelian unit baru' },
    { group: 'JenisTransaksi', label: 'REFINANCING', Description: 'Refinancing' },
    { group: 'JenisTransaksi', label: 'TRADE-IN',    Description: 'Tukar tambah' },
    { group: 'JenisTransaksi', label: 'CASH',        Description: 'Tunai' },

    // ─── Form5: MERK/TIPE ───
    { group: 'MerkTipe', label: 'SESUAI',       Description: 'Merk/tipe sesuai' },
    { group: 'MerkTipe', label: 'TIDAK SESUAI', Description: 'Merk/tipe tidak sesuai' },

    // ─── Form5: BESAR ANGSURAN & TENOR ───
    { group: 'BesarAngsuranTenor', label: 'SESUAI',       Description: 'Angsuran & tenor sesuai' },
    { group: 'BesarAngsuranTenor', label: 'TIDAK SESUAI', Description: 'Angsuran & tenor tidak sesuai' },

    // ─── Form5: UNIT SUDAH DITERIMA / BELUM ───
    { group: 'UnitSudahDiterima', label: 'SUDAH',  Description: 'Unit sudah diterima' },
    { group: 'UnitSudahDiterima', label: 'BELUM',  Description: 'Unit belum diterima' },

    // ─── Form6: STATUS DEBITUR ───
    { group: 'StatusDebitur', label: 'PEMILIK',   Description: 'Debitur sebagai pemilik' },
    { group: 'StatusDebitur', label: 'KARYAWAN',  Description: 'Debitur sebagai karyawan' },

    // ─── Form6: LAMA USAHA / BEKERJA ───
    { group: 'LamaUsaha', label: '<=1-3 TH',   Description: 'Kurang dari atau sama dengan 3 tahun' },
    { group: 'LamaUsaha', label: '>3-5 TH',    Description: 'Lebih dari 3 sampai 5 tahun' },

    // ─── Form6: STATUS KEPEMILIKAN TEMPAT USAHA ───
    { group: 'StatusKepemilikanTempat', label: 'MILIK SENDIRI', Description: 'Milik sendiri' },
    { group: 'StatusKepemilikanTempat', label: 'SEWA',          Description: 'Sewa' },

    // ─── Form6: JARAK TEMPAT USAHA VS RUMAH ───
    { group: 'JarakTempat', label: '<=30 KM',  Description: 'Jarak kurang dari atau sama dengan 30 KM' },
    { group: 'JarakTempat', label: '>30 KM',   Description: 'Jarak lebih dari 30 KM' },

    // ─── Form6: PEMBAYARAN GAJI (KHUSUS KARYAWAN) ───
    { group: 'PembayaranGaji', label: 'TRANSFER', Description: 'Pembayaran via transfer' },
    { group: 'PembayaranGaji', label: 'TUNAI',    Description: 'Pembayaran tunai' },

    // ─── Form6: STATUS KARYAWAN ───
    { group: 'StatusKaryawan', label: 'TETAP',    Description: 'Karyawan tetap' },
    { group: 'StatusKaryawan', label: 'KONTRAK',  Description: 'Karyawan kontrak' },
  ];

  for (const preset of presets) {
    await prisma.keyValue.upsert({
      where: {
        group_label: {
          group: preset.group,
          label: preset.label,
        },
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