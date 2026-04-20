/*
  Warnings:

  - The primary key for the `aset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `aset` table. All the data in the column will be lost.
  - The primary key for the `dokumen_persyaratan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `dokumen_persyaratan` table. All the data in the column will be lost.
  - The primary key for the `kewajiban` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `kewajiban` table. All the data in the column will be lost.
  - The primary key for the `mutasi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mutasi` table. All the data in the column will be lost.
  - The primary key for the `pembayaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pembayaran` table. All the data in the column will be lost.
  - The primary key for the `pembiayaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pembiayaan` table. All the data in the column will be lost.
  - The primary key for the `pendapatan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pendapatan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[form9Id,nama_bank]` on the table `aset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form2Id,jenis_dokumen]` on the table `dokumen_persyaratan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form7Id,key]` on the table `kewajiban` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bankId,saldo,debit,kredit]` on the table `mutasi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form10Id,noPinjaman]` on the table `pembayaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form11Id,key]` on the table `pembiayaan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form7Id,key]` on the table `pendapatan` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nama_bank` on table `aset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `aset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jenis_dokumen` on table `dokumen_persyaratan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `noPinjaman` on table `pembayaran` required. This step will fail if there are existing NULL values in that column.
  - Made the column `key` on table `pembiayaan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "aset" DROP CONSTRAINT "aset_pkey",
DROP COLUMN "id",
ALTER COLUMN "nama_bank" SET NOT NULL,
ALTER COLUMN "nama" SET NOT NULL;

-- AlterTable
ALTER TABLE "dokumen_persyaratan" DROP CONSTRAINT "dokumen_persyaratan_pkey",
DROP COLUMN "id",
ALTER COLUMN "jenis_dokumen" SET NOT NULL;

-- AlterTable
ALTER TABLE "kewajiban" DROP CONSTRAINT "kewajiban_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "mutasi" DROP CONSTRAINT "mutasi_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "pembayaran" DROP CONSTRAINT "pembayaran_pkey",
DROP COLUMN "id",
ALTER COLUMN "noPinjaman" SET NOT NULL,
ALTER COLUMN "besarAngsuran" DROP NOT NULL,
ALTER COLUMN "besarAngsuran" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "angsKe" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "pembiayaan" DROP CONSTRAINT "pembiayaan_pkey",
DROP COLUMN "id",
ALTER COLUMN "key" SET NOT NULL,
ALTER COLUMN "jumlahUnit" DROP NOT NULL,
ALTER COLUMN "jumlahUnit" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "pendapatan" DROP CONSTRAINT "pendapatan_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "aset_form9Id_nama_bank_key" ON "aset"("form9Id", "nama_bank");

-- CreateIndex
CREATE UNIQUE INDEX "dokumen_persyaratan_form2Id_jenis_dokumen_key" ON "dokumen_persyaratan"("form2Id", "jenis_dokumen");

-- CreateIndex
CREATE UNIQUE INDEX "kewajiban_form7Id_key_key" ON "kewajiban"("form7Id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "mutasi_bankId_saldo_debit_kredit_key" ON "mutasi"("bankId", "saldo", "debit", "kredit");

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_form10Id_noPinjaman_key" ON "pembayaran"("form10Id", "noPinjaman");

-- CreateIndex
CREATE UNIQUE INDEX "pembiayaan_form11Id_key_key" ON "pembiayaan"("form11Id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "pendapatan_form7Id_key_key" ON "pendapatan"("form7Id", "key");
