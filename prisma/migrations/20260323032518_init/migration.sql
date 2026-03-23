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
    "os_pokok_cabang" DECIMAL(18,2),
    "bmpk" DECIMAL(5,2),
    "total_pokok_hutang" DECIMAL(15,2),
    "total_exposure" DECIMAL(15,2),
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengajuan_kredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoDebitur" (
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

    CONSTRAINT "InfoDebitur_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfoDebitur" ADD CONSTRAINT "InfoDebitur_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kendaraan" ADD CONSTRAINT "data_kendaraan_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_usaha" ADD CONSTRAINT "info_usaha_pengajuan_kredit_id_fkey" FOREIGN KEY ("pengajuan_kredit_id") REFERENCES "pengajuan_kredit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
