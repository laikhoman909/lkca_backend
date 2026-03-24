-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengajuan_kredit" (
    "id" SERIAL NOT NULL,
    "tanggal_telepon" DATE,
    "jam_telepon" TEXT,
    "cabang" TEXT,
    "nama_cmo" TEXT,
    "fid_cmo" DECIMAL(10,2),
    "nama_debitur" TEXT,
    "nama_dealer" TEXT,
    "msub" TEXT,
    "pokok_hutang" DECIMAL(15,2),
    "status_cadab" JSONB,
    "jenis_pengajuan" JSONB,
    "penandatanganan_kontrak" JSONB,
    "penjelasan_pasal_penting" JSONB,
    "nama_cmo_sesuai_survey" JSONB,
    "cmo_id" TEXT,
    "mengetahui_itc_dari" JSONB,
    "nama_dealer_sesuai" JSONB,
    "tujuan_pembelian_mobil" JSONB,
    "kendaraan_dibawa_oleh" JSONB,
    "pembawa_memiliki_sim" JSONB,
    "cek_kondisi_mobil" JSONB,
    "kondisi_mobil_persen" DECIMAL(5,2),
    "os_pokok_cabang" DECIMAL(18,2),
    "bmpk" DECIMAL(5,2),
    "total_pokok_hutang" DECIMAL(15,2),
    "total_exposure" DECIMAL(15,2),
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengajuan_kredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "konfirmasi_pembiayaan" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "jenis_transaksi" JSONB,
    "merk_tipe_sesuai" JSONB,
    "angsuran_tenor_sesuai" JSONB,
    "unit_diterima" JSONB,
    "harga_otr" DECIMAL(15,2),
    "besar_down_payment" DECIMAL(15,2),
    "keterangan_dp" TEXT,
    "nama_penjual" TEXT,
    "telepon_penjual" TEXT,
    "hasil_konfirmasi_penjual" TEXT,
    "kapas_memiliki_mobil" DATE,
    "harga_beli_saat_itu" DECIMAL(15,2),
    "kebutuhan_dana" DECIMAL(15,2),
    "tujuan_kebutuhan_dana" TEXT,
    "posisi_bpkb" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "konfirmasi_pembiayaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_debitur" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "nama_jelas_sesuai_ktp" JSONB,
    "tempat_tinggal_sesuai_ktp" JSONB,
    "status_tempat_tinggal" JSONB,
    "status_pernikahan" JSONB,
    "nama_pasangan_sesuai" JSONB,
    "status_asal_usul_cadab" JSONB,
    "lama_tinggal" JSONB,
    "jumlah_tanggungan" JSONB,
    "status_anak" JSONB,
    "pendidikan_terakhir" JSONB,
    "usia_debitur" INTEGER,
    "kategori_usia" JSONB,
    "nama_jelas_sesuai_akte" JSONB,
    "alamat_kantor_sesuai_akte" JSONB,
    "status_kepemilikan_kantor" JSONB,
    "lama_menempati" JSONB,
    "usia_pemegang_saham" JSONB,
    "jumlah_karyawan" JSONB,
    "nama_pengurus" TEXT,
    "jabatan_pengurus" TEXT,
    "besar_saham" DECIMAL(10,2),
    "hubungan_pengurus" TEXT,
    "keterangan_pengurus" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_debitur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_kendaraan" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 1,
    "merk_type" TEXT,
    "tahun" INTEGER,
    "nopol" TEXT,
    "ph_pengajuan" DECIMAL(15,2),
    "atas_nama" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_kendaraan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen_persyaratan" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "jenis_dokumen" TEXT,
    "status_ada" JSONB,
    "tipe_dokumen" JSONB,
    "keterangan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 1,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dokumen_persyaratan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_usaha" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "nama_perusahaan" TEXT,
    "jenis_usaha" TEXT,
    "status_debitur" JSONB,
    "lama_usaha" JSONB,
    "lama_usaha_tahun" INTEGER,
    "status_kepemilikan_tempat" JSONB,
    "biaya_sewa" DECIMAL(15,2),
    "jarak_tempat_usaha" JSONB,
    "pembayaran_gaji" JSONB,
    "status_karyawan" JSONB,
    "alamat_usaha" TEXT,
    "alamat_pool" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "usaha_sebelumnya" TEXT,
    "uraian_usaha_1" TEXT,
    "uraian_usaha_2" TEXT,
    "uraian_usaha_3" TEXT,
    "nama_rekanan" TEXT,
    "telepon_rekanan" TEXT,
    "keterangan_rekanan" TEXT,
    "ec_nama" TEXT,
    "ec_hubungan" TEXT,
    "ec_telepon" TEXT,
    "ec_keterangan" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_usaha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perhitungan_pendapatan" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "sumber_pendapatan" TEXT,
    "pendapatan" DECIMAL(15,2),
    "harga_pokok_pembelian" DECIMAL(15,2),
    "pendapatan_kotor" DECIMAL(15,2),
    "biaya_operasional" DECIMAL(15,2),
    "sewa_kantor" DECIMAL(15,2),
    "gaji_pegawai" DECIMAL(15,2),
    "bbm" DECIMAL(15,2),
    "listrik_telepon_air" DECIMAL(15,2),
    "biaya_lain" DECIMAL(15,2),
    "total_pengeluaran" DECIMAL(15,2),
    "total_pendapatan" DECIMAL(15,2),
    "total_pinjaman_lain" DECIMAL(15,2),
    "total_angsuran_itc" DECIMAL(15,2),
    "grand_total_pinjaman" DECIMAL(15,2),
    "net_income" DECIMAL(15,2),
    "angsuran_itc_diajukan" DECIMAL(15,2),
    "dsr" DECIMAL(5,2),
    "rekomendasi_ltv" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perhitungan_pendapatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mutasi_rekening" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "nama_bank" TEXT,
    "atas_nama" TEXT,
    "bulan" TEXT,
    "saldo_awal" DECIMAL(15,2),
    "debet" DECIMAL(15,2),
    "kredit" DECIMAL(15,2),
    "saldo_akhir" DECIMAL(15,2),
    "total_debet" DECIMAL(15,2),
    "total_kredit" DECIMAL(15,2),
    "rata_rata_debet" DECIMAL(15,2),
    "rata_rata_kredit" DECIMAL(15,2),
    "mutasi_vs_omset" JSONB,
    "persen_tercermin" DECIMAL(5,2),
    "keterangan" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mutasi_rekening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aset_lain" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "jenis_aset" TEXT,
    "merk_type" TEXT,
    "tahun" INTEGER,
    "nopol" TEXT,
    "status_kredit" JSONB,
    "nama_mf_bank" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aset_lain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_payment" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "nomor_pinjaman" TEXT,
    "atas_nama" TEXT,
    "besar_angsuran" DECIMAL(15,2),
    "os_pokok" DECIMAL(15,2),
    "angsuran_ke" INTEGER,
    "tenor" TEXT,
    "overdue" INTEGER,
    "keterangan" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_slik" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "jenis_pembiayaan" TEXT,
    "status" JSONB,
    "jumlah_unit" INTEGER,
    "jumlah_account" TEXT,
    "coll_terendah" JSONB,
    "keterangan" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_slik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kewajiban_lain" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "lembaga_pembiayaan" TEXT,
    "bank" TEXT,
    "merk_type_tahun" TEXT,
    "besar_angsuran" DECIMAL(15,2),
    "angsuran_ke" INTEGER,
    "tenor" TEXT,
    "keterangan" TEXT,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kewajiban_lain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_jaminan" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "harga_pasar" DECIMAL(15,2),
    "referensi_dari_dealer" TEXT,
    "harga_terendah_media_online" DECIMAL(15,2),
    "sumber_harga_terendah" TEXT,
    "harga_tertinggi_media_online" DECIMAL(15,2),
    "sumber_harga_tertinggi" TEXT,
    "harga_rata_rata" DECIMAL(15,2),
    "catatan_harga" TEXT,
    "ltv_persen" DECIMAL(5,2),
    "ltv_nilai" DECIMAL(15,2),
    "ph" DECIMAL(15,2),
    "selisih" DECIMAL(15,2),
    "sph_trayek" DECIMAL(15,2),
    "harga_real_sesuai_cadab" DECIMAL(15,2),
    "dp_dibayar_cadab" DECIMAL(15,2),
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_jaminan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keputusan_kredit" (
    "id" SERIAL NOT NULL,
    "pengajuan_kredit_id" INTEGER NOT NULL,
    "positif_poin" TEXT,
    "negatif_poin" TEXT,
    "hambatan" TEXT,
    "diverifikasi_oleh" TEXT,
    "jabatan_verifikator" TEXT,
    "direkomendasikan_oleh" TEXT,
    "jabatan_rekomendator" TEXT,
    "keputusan_ca" JSONB,
    "ph_rekomendasi" DECIMAL(15,2),
    "syarat_rekomendasi" TEXT,
    "catatan_credit_committee" TEXT,
    "nama_direktur_csr" TEXT,
    "keputusan_direktur_csr" JSONB,
    "syarat_direktur_csr" TEXT,
    "nama_direktur_utama" TEXT,
    "keputusan_direktur_utama" JSONB,
    "syarat_direktur_utama" TEXT,
    "catatan_banding_cabang" TEXT,
    "keputusan_banding" JSONB,
    "tanggal_keputusan" DATE,
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keputusan_kredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konfirmasi_pembiayaan" ADD CONSTRAINT "konfirmasi_pembiayaan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_debitur" ADD CONSTRAINT "info_debitur_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kendaraan" ADD CONSTRAINT "data_kendaraan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_persyaratan" ADD CONSTRAINT "dokumen_persyaratan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_usaha" ADD CONSTRAINT "info_usaha_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perhitungan_pendapatan" ADD CONSTRAINT "perhitungan_pendapatan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutasi_rekening" ADD CONSTRAINT "mutasi_rekening_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aset_lain" ADD CONSTRAINT "aset_lain_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_payment" ADD CONSTRAINT "record_payment_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_slik" ADD CONSTRAINT "data_slik_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kewajiban_lain" ADD CONSTRAINT "kewajiban_lain_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_jaminan" ADD CONSTRAINT "info_jaminan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keputusan_kredit" ADD CONSTRAINT "keputusan_kredit_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
