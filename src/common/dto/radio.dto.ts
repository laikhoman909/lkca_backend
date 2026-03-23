import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

/**
 * RadioDto - Data type for checkbox/radio button form fields
 * Used for fields where users select from predefined options
 * 
 * Example: { key: 'StatusCalonDebitur', value: 1, customValue: '' }
 * 
 * Note: This class implements Prisma's InputJsonValue compatible interface
 * by including an index signature for JSON serialization
 */
export class RadioDto {
  // Index signature for Prisma JSON compatibility
  [key: string]: string | number | undefined;

  @IsString()
  key: string;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  customValue?: string;

  constructor(partial?: Partial<RadioDto>) {
    Object.assign(this, partial);
  }
}

/**
 * Helper function to create a RadioDto instance
 */
export function createRadioDto(key: string, value: number, customValue: string = ''): RadioDto {
  return new RadioDto({ key, value, customValue });
}

/**
 * Common radio/checkbox field keys used in LKCA Form
 */
export const RadioFieldKeys = {
  // Status Calon Debitur
  STATUS_CADAB: 'StatusCalonDebitur',
  
  // Jenis Pengajuan
  JENIS_PENGAJUAN: 'JenisPengajuan',
  
  // Konfirmasi Tanda Tangan
  PENANDATANGANAN_KONTRAK: 'PenandatangananKontrak',
  PENJELASAN_PASAL_PENTING: 'PenjelasanPasalPenting',
  NAMA_CMO_SESUAI_SURVEY: 'NamaCmoSesuaiSurvey',
  
  // Kronologis Transaksi
  MENGETAHUI_ITC_DARI: 'MengetahuiItcDari',
  NAMA_DEALER_SESUAI: 'NamaDealerSesuai',
  TUJUAN_PEMBELIAN_MOBIL: 'TujuanPembelianMobil',
  KENDARAAN_DIBAWA_OLEH: 'KendaraanDibawaOleh',
  PEMBAWA_MEMILIKI_SIM: 'PembawaMemilikiSim',
  CEK_KONDISI_MOBIL: 'CekKondisiMobil',
  
  // Produk & Jenis Pembiayaan
  JENIS_TRANSAKSI: 'JenisTransaksi',
  MERK_TIPE_SESUAI: 'MerkTipeSesuai',
  ANGSURAN_TENOR_SESUAI: 'AngsuranTenorSesuai',
  UNIT_DITERIMA: 'UnitDiterima',
  
  // Info Debitur - Pribadi
  NAMA_JELAS_SESUAI_KTP: 'NamaJelasSesuaiKtp',
  TEMPAT_TINGGAL_SESUAI_KTP: 'TempatTinggalSesuaiKtp',
  STATUS_TEMPAT_TINGGAL: 'StatusTempatTinggal',
  STATUS_PERNIKAHAN: 'StatusPernikahan',
  NAMA_PASANGAN_SESUAI: 'NamaPasanganSesuai',
  STATUS_ASAL_USUL_CADEB: 'StatusAsalUsulCadab',
  LAMA_TINGGAL: 'LamaTinggal',
  JUMLAH_TANGGUNGAN: 'JumlahTanggungan',
  STATUS_ANAK: 'StatusAnak',
  PENDIDIKAN_TERAKHIR: 'PendidikanTerakhir',
  KATEGORI_USIA: 'KategoriUsia',
  
  // Info Debitur - Badan Usaha
  NAMA_JELAS_SESUAI_AKTE: 'NamaJelasSesuaiAkte',
  ALAMAT_KANTOR_SESUAI_AKTE: 'AlamatKantorSesuaiAkte',
  STATUS_KEPEMILIKAN_KANTOR: 'StatusKepemilikanKantor',
  LAMA_MENEMPATI: 'LamaMenempati',
  USIA_PEMEGANG_SAHAM: 'UsiaPemegangSaham',
  JUMLAH_KARYAWAN: 'JumlahKaryawan',
  
  // Dokumen Persyaratan (Section 2)
  STATUS_ADA: 'StatusAda',           // ADA/TIDAK
  TIPE_DOKUMEN: 'TipeDokumen',       // FOTO ASLI/COPY
  
  // Info Usaha
  STATUS_DEBITUR: 'StatusDebitur',
  LAMA_USAHA: 'LamaUsaha',
  STATUS_KEPEMILIKAN_TEMPAT: 'StatusKepemilikanTempat',
  JARAK_TEMPAT_USAHA: 'JarakTempatUsaha',
  PEMBAYARAN_GAJI: 'PembayaranGaji',
  STATUS_KARYAWAN: 'StatusKaryawan',
  
  // Mutasi Rekening
  MUTASI_VS_OMSET: 'MutasiVsOmset',
  
  // Aset Lain
  STATUS_KREDIT: 'StatusKredit',
  
  // Data SLIK
  STATUS_SLIK: 'StatusSlik',
  COLL_TERENDAH: 'CollTerendah',
  
  // Keputusan Kredit
  KEPUTUSAN_CA: 'KeputusanCa',
  KEPUTUSAN_DIREKTUR_CSR: 'KeputusanDirekturCsr',
  KEPUTUSAN_DIREKTUR_UTAMA: 'KeputusanDirekturUtama',
  KEPUTUSAN_BANDING: 'KeputusanBanding',
} as const;

/**
 * Radio field options - defines available options for each radio field
 */
export const RadioFieldOptions: Record<string, Array<{ label: string; value: number }>> = {
  [RadioFieldKeys.STATUS_CADAB]: [
    { label: 'RO', value: 0 },
    { label: 'A/O', value: 1 },
    { label: 'Invoice New Debitur', value: 2 },
  ],
  [RadioFieldKeys.JENIS_PENGAJUAN]: [
    { label: 'Pembelian', value: 0 },
    { label: 'Refinancing', value: 1 },
    { label: 'Top Up', value: 2 },
    { label: 'Over Credit', value: 3 },
  ],
  [RadioFieldKeys.PENANDATANGANAN_KONTRAK]: [
    { label: 'Sudah', value: 0 },
    { label: 'Belum', value: 1 },
  ],
  [RadioFieldKeys.PENJELASAN_PASAL_PENTING]: [
    { label: 'Sudah', value: 0 },
    { label: 'Belum', value: 1 },
  ],
  [RadioFieldKeys.NAMA_CMO_SESUAI_SURVEY]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Belum', value: 1 },
  ],
  [RadioFieldKeys.MENGETAHUI_ITC_DARI]: [
    { label: 'Teman', value: 0 },
    { label: 'Keluarga', value: 1 },
    { label: 'Media', value: 2 },
    { label: 'Lainnya', value: 3 },
  ],
  [RadioFieldKeys.TUJUAN_PEMBELIAN_MOBIL]: [
    { label: 'Usaha', value: 0 },
    { label: 'Pribadi', value: 1 },
    { label: 'Angkutan Ekspedisi', value: 2 },
  ],
  [RadioFieldKeys.KENDARAAN_DIBAWA_OLEH]: [
    { label: 'Debitur', value: 0 },
    { label: 'Pasangan', value: 1 },
    { label: 'Lainnya', value: 2 },
  ],
  [RadioFieldKeys.PEMBAWA_MEMILIKI_SIM]: [
    { label: 'Ada', value: 0 },
    { label: 'Tidak', value: 1 },
  ],
  [RadioFieldKeys.CEK_KONDISI_MOBIL]: [
    { label: 'Sudah', value: 0 },
    { label: 'Belum', value: 1 },
  ],
  [RadioFieldKeys.JENIS_TRANSAKSI]: [
    { label: 'Pembelian', value: 0 },
    { label: 'Refinancing', value: 1 },
  ],
  [RadioFieldKeys.MERK_TIPE_SESUAI]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Tidak Sesuai', value: 1 },
  ],
  [RadioFieldKeys.ANGSURAN_TENOR_SESUAI]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Tidak Sesuai', value: 1 },
  ],
  [RadioFieldKeys.UNIT_DITERIMA]: [
    { label: 'Sudah', value: 0 },
    { label: 'Belum', value: 1 },
  ],
  [RadioFieldKeys.NAMA_JELAS_SESUAI_KTP]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Tidak Sesuai', value: 1 },
  ],
  [RadioFieldKeys.TEMPAT_TINGGAL_SESUAI_KTP]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Tidak Sesuai', value: 1 },
  ],
  [RadioFieldKeys.STATUS_TEMPAT_TINGGAL]: [
    { label: 'Milik Sendiri', value: 0 },
    { label: 'Sewa', value: 1 },
    { label: 'Keluarga', value: 2 },
  ],
  [RadioFieldKeys.STATUS_PERNIKAHAN]: [
    { label: 'Menikah', value: 0 },
    { label: 'Cerai Hidup', value: 1 },
    { label: 'Belum Menikah', value: 2 },
  ],
  [RadioFieldKeys.NAMA_PASANGAN_SESUAI]: [
    { label: 'Sesuai', value: 0 },
    { label: 'Tidak Sesuai', value: 1 },
  ],
  [RadioFieldKeys.STATUS_ASAL_USUL_CADEB]: [
    { label: 'Warga Asli', value: 0 },
    { label: 'Pendatang', value: 1 },
  ],
  [RadioFieldKeys.LAMA_TINGGAL]: [
    { label: '< 3 Th', value: 0 },
    { label: '> 3 sd 5 Th', value: 1 },
    { label: '> 5 Th', value: 2 },
    { label: 'Sejak Kecil', value: 3 },
  ],
  [RadioFieldKeys.JUMLAH_TANGGUNGAN]: [
    { label: '1-2 Org', value: 0 },
    { label: '3-4 Org', value: 1 },
    { label: '5-6 Org', value: 2 },
    { label: '> 6 Org', value: 3 },
  ],
  [RadioFieldKeys.STATUS_ANAK]: [
    { label: 'TK - SD 1 Org', value: 0 },
    { label: 'SMP-SMA 1 Org', value: 1 },
    { label: 'Kuliah 1 Org', value: 2 },
    { label: 'Balita 1 Org', value: 3 },
  ],
  [RadioFieldKeys.PENDIDIKAN_TERAKHIR]: [
    { label: '< SMA', value: 0 },
    { label: 'D1 - S1', value: 1 },
    { label: '> S1', value: 2 },
  ],
  [RadioFieldKeys.KATEGORI_USIA]: [
    { label: '< 21 Th', value: 0 },
    { label: '> 21 - 35 Th', value: 1 },
    { label: '> 35 - 55 Th', value: 2 },
    { label: '> 55 Th', value: 3 },
  ],
  [RadioFieldKeys.STATUS_DEBITUR]: [
    { label: 'Pemilik', value: 0 },
    { label: 'Karyawan', value: 1 },
  ],
  [RadioFieldKeys.LAMA_USAHA]: [
    { label: '< 1 - 3 Th', value: 0 },
    { label: '> 3 - 5 Th', value: 1 },
    { label: '> 5 Th', value: 2 },
  ],
  [RadioFieldKeys.STATUS_KEPEMILIKAN_TEMPAT]: [
    { label: 'Milik Sendiri', value: 0 },
    { label: 'Sewa', value: 1 },
  ],
  [RadioFieldKeys.JARAK_TEMPAT_USAHA]: [
    { label: '< 30 KM', value: 0 },
    { label: '> 30 KM', value: 1 },
  ],
  [RadioFieldKeys.PEMBAYARAN_GAJI]: [
    { label: 'Transfer', value: 0 },
    { label: 'Tunai', value: 1 },
  ],
  [RadioFieldKeys.STATUS_KARYAWAN]: [
    { label: 'Tetap', value: 0 },
    { label: 'Kontrak', value: 1 },
  ],
  [RadioFieldKeys.MUTASI_VS_OMSET]: [
    { label: 'Tercermin', value: 0 },
    { label: 'Tidak', value: 1 },
  ],
  [RadioFieldKeys.STATUS_KREDIT]: [
    { label: 'Lunas', value: 0 },
    { label: 'Kredit', value: 1 },
  ],
  // Dokumen Persyaratan (Section 2)
  [RadioFieldKeys.STATUS_ADA]: [
    { label: 'ADA', value: 0 },
    { label: 'TIDAK', value: 1 },
  ],
  [RadioFieldKeys.TIPE_DOKUMEN]: [
    { label: 'FOTO', value: 0 },
    { label: 'ASLI', value: 1 },
    { label: 'COPY', value: 2 },
  ],
  [RadioFieldKeys.KEPUTUSAN_CA]: [
    { label: 'Recommend', value: 0 },
    { label: 'Recommend Bersyarat', value: 1 },
    { label: 'Not Recommend', value: 2 },
  ],
  [RadioFieldKeys.KEPUTUSAN_DIREKTUR_CSR]: [
    { label: 'Disetujui', value: 0 },
    { label: 'Disetujui Bersyarat', value: 1 },
    { label: 'Ditolak', value: 2 },
  ],
  [RadioFieldKeys.KEPUTUSAN_DIREKTUR_UTAMA]: [
    { label: 'Disetujui', value: 0 },
    { label: 'Disetujui Bersyarat', value: 1 },
    { label: 'Ditolak', value: 2 },
  ],
  [RadioFieldKeys.KEPUTUSAN_BANDING]: [
    { label: 'Disetujui', value: 0 },
    { label: 'Disetujui Bersyarat', value: 1 },
    { label: 'Ditolak', value: 2 },
  ],
};

// Type alias for Prisma JSON compatibility
export type RadioDtoInput = Prisma.InputJsonValue;