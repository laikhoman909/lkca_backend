/*
  Warnings:

  - You are about to drop the `_Form1LatarBelakangBu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Form1LatarBelakangPribadi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `form0Id` to the `key_value` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangBu" DROP CONSTRAINT "_Form1LatarBelakangBu_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangBu" DROP CONSTRAINT "_Form1LatarBelakangBu_B_fkey";

-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangPribadi" DROP CONSTRAINT "_Form1LatarBelakangPribadi_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangPribadi" DROP CONSTRAINT "_Form1LatarBelakangPribadi_B_fkey";

-- AlterTable
ALTER TABLE "key_value" ADD COLUMN     "form0Id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_Form1LatarBelakangBu";

-- DropTable
DROP TABLE "_Form1LatarBelakangPribadi";

-- CreateTable
CREATE TABLE "pendapatan" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "income1" INTEGER NOT NULL,
    "income2" INTEGER NOT NULL,
    "income3" INTEGER NOT NULL,
    "income4" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "form7Id" INTEGER NOT NULL,

    CONSTRAINT "pendapatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kewajiban" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "value" INTEGER NOT NULL,
    "form7Id" INTEGER NOT NULL,

    CONSTRAINT "kewajiban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7" (
    "form7Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form7_pkey" PRIMARY KEY ("form7Id")
);

-- CreateTable
CREATE TABLE "form9" (
    "form0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form9_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "aset" (
    "id" SERIAL NOT NULL,
    "merk_tipe_tahun" TEXT,
    "nopol" TEXT,
    "status" TEXT,
    "nama_bank" TEXT,
    "form9Id" INTEGER NOT NULL,

    CONSTRAINT "aset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "key_value" ADD CONSTRAINT "lb_pribadi" FOREIGN KEY ("form0Id") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_value" ADD CONSTRAINT "lb_bu" FOREIGN KEY ("form0Id") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendapatan" ADD CONSTRAINT "pendapatan_form7Id_fkey" FOREIGN KEY ("form7Id") REFERENCES "form7"("form7Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kewajiban" ADD CONSTRAINT "kewajiban_form7Id_fkey" FOREIGN KEY ("form7Id") REFERENCES "form7"("form7Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aset" ADD CONSTRAINT "aset_form9Id_fkey" FOREIGN KEY ("form9Id") REFERENCES "form9"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;
