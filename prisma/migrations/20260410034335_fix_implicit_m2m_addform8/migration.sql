/*
  Warnings:

  - The primary key for the `form7` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `form7Id` on the `form7` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `form0Id` on the `key_value` table. All the data in the column will be lost.
  - You are about to drop the `_Form3KeyValues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Form4KeyValues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Form5KeyValues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Form6KeyValues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `form0Id` to the `form7` table without a default value. This is not possible if the table is not empty.
  - Added the required column `angsuranAjukan` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dsr` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netIncome` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertimbangan` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rekomendasi` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAngsuran` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPinjaman` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPinjamanLain` to the `kewajiban` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Form3KeyValues" DROP CONSTRAINT "_Form3KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form3KeyValues" DROP CONSTRAINT "_Form3KeyValues_B_fkey";

-- DropForeignKey
ALTER TABLE "_Form4KeyValues" DROP CONSTRAINT "_Form4KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form4KeyValues" DROP CONSTRAINT "_Form4KeyValues_B_fkey";

-- DropForeignKey
ALTER TABLE "_Form5KeyValues" DROP CONSTRAINT "_Form5KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form5KeyValues" DROP CONSTRAINT "_Form5KeyValues_B_fkey";

-- DropForeignKey
ALTER TABLE "_Form6KeyValues" DROP CONSTRAINT "_Form6KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form6KeyValues" DROP CONSTRAINT "_Form6KeyValues_B_fkey";

-- DropForeignKey
ALTER TABLE "kewajiban" DROP CONSTRAINT "kewajiban_form7Id_fkey";

-- DropForeignKey
ALTER TABLE "key_value" DROP CONSTRAINT "lb_bu";

-- DropForeignKey
ALTER TABLE "key_value" DROP CONSTRAINT "lb_pribadi";

-- DropForeignKey
ALTER TABLE "pendapatan" DROP CONSTRAINT "pendapatan_form7Id_fkey";

-- AlterTable
ALTER TABLE "form7" DROP CONSTRAINT "form7_pkey",
DROP COLUMN "form7Id",
ADD COLUMN     "form0Id" INTEGER NOT NULL,
ADD CONSTRAINT "form7_pkey" PRIMARY KEY ("form0Id");

-- AlterTable
ALTER TABLE "kewajiban" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "angsuranAjukan" INTEGER NOT NULL,
ADD COLUMN     "dsr" INTEGER NOT NULL,
ADD COLUMN     "netIncome" INTEGER NOT NULL,
ADD COLUMN     "pertimbangan" INTEGER NOT NULL,
ADD COLUMN     "rekomendasi" INTEGER NOT NULL,
ADD COLUMN     "totalAngsuran" INTEGER NOT NULL,
ADD COLUMN     "totalPinjaman" INTEGER NOT NULL,
ADD COLUMN     "totalPinjamanLain" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "key_value" DROP COLUMN "form0Id";

-- DropTable
DROP TABLE "_Form3KeyValues";

-- DropTable
DROP TABLE "_Form4KeyValues";

-- DropTable
DROP TABLE "_Form5KeyValues";

-- DropTable
DROP TABLE "_Form6KeyValues";

-- CreateTable
CREATE TABLE "form8" (
    "form0Id" INTEGER NOT NULL,
    "keterangan" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form8_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "bank" (
    "id" SERIAL NOT NULL,
    "keterangan" VARCHAR(100),
    "atasNama" VARCHAR(100),
    "nama" VARCHAR(100),
    "radio" VARCHAR(20),
    "saldoAwal" INTEGER NOT NULL,
    "form8Id" INTEGER NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mutasi" (
    "id" SERIAL NOT NULL,
    "keterangan" VARCHAR(100),
    "debit" INTEGER NOT NULL,
    "kredit" INTEGER NOT NULL,
    "saldo" INTEGER NOT NULL,
    "bankId" INTEGER NOT NULL,

    CONSTRAINT "mutasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laporan_keuangan" (
    "id" SERIAL NOT NULL,
    "keterangan" VARCHAR(100),
    "pendapatanLaba" INTEGER NOT NULL,
    "biaya" INTEGER NOT NULL,
    "net" INTEGER NOT NULL,
    "form8Id" INTEGER NOT NULL,

    CONSTRAINT "laporan_keuangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Form1ToKeyValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form1ToKeyValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form3ToKeyValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form3ToKeyValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form4ToKeyValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form4ToKeyValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form5ToKeyValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form5ToKeyValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form6ToKeyValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form6ToKeyValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Form1ToKeyValue_B_index" ON "_Form1ToKeyValue"("B");

-- CreateIndex
CREATE INDEX "_Form3ToKeyValue_B_index" ON "_Form3ToKeyValue"("B");

-- CreateIndex
CREATE INDEX "_Form4ToKeyValue_B_index" ON "_Form4ToKeyValue"("B");

-- CreateIndex
CREATE INDEX "_Form5ToKeyValue_B_index" ON "_Form5ToKeyValue"("B");

-- CreateIndex
CREATE INDEX "_Form6ToKeyValue_B_index" ON "_Form6ToKeyValue"("B");

-- AddForeignKey
ALTER TABLE "pendapatan" ADD CONSTRAINT "pendapatan_form7Id_fkey" FOREIGN KEY ("form7Id") REFERENCES "form7"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kewajiban" ADD CONSTRAINT "kewajiban_form7Id_fkey" FOREIGN KEY ("form7Id") REFERENCES "form7"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank" ADD CONSTRAINT "bank_form8Id_fkey" FOREIGN KEY ("form8Id") REFERENCES "form8"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutasi" ADD CONSTRAINT "mutasi_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporan_keuangan" ADD CONSTRAINT "laporan_keuangan_form8Id_fkey" FOREIGN KEY ("form8Id") REFERENCES "form8"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1ToKeyValue" ADD CONSTRAINT "_Form1ToKeyValue_A_fkey" FOREIGN KEY ("A") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1ToKeyValue" ADD CONSTRAINT "_Form1ToKeyValue_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form3ToKeyValue" ADD CONSTRAINT "_Form3ToKeyValue_A_fkey" FOREIGN KEY ("A") REFERENCES "form3"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form3ToKeyValue" ADD CONSTRAINT "_Form3ToKeyValue_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form4ToKeyValue" ADD CONSTRAINT "_Form4ToKeyValue_A_fkey" FOREIGN KEY ("A") REFERENCES "form4"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form4ToKeyValue" ADD CONSTRAINT "_Form4ToKeyValue_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form5ToKeyValue" ADD CONSTRAINT "_Form5ToKeyValue_A_fkey" FOREIGN KEY ("A") REFERENCES "form5"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form5ToKeyValue" ADD CONSTRAINT "_Form5ToKeyValue_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form6ToKeyValue" ADD CONSTRAINT "_Form6ToKeyValue_A_fkey" FOREIGN KEY ("A") REFERENCES "form6"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form6ToKeyValue" ADD CONSTRAINT "_Form6ToKeyValue_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;
