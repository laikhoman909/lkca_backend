/*
  Warnings:

  - Changed the type of `TanggalTelepon` on the `form0` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "form0" DROP COLUMN "TanggalTelepon",
ADD COLUMN     "TanggalTelepon" VARCHAR(15) NOT NULL;

-- CreateTable
CREATE TABLE "form10" (
    "form0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form10_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" SERIAL NOT NULL,
    "noPinjaman" VARCHAR(255),
    "atasNama" VARCHAR(100),
    "besarAngsuran" INTEGER NOT NULL,
    "oSPokok" VARCHAR(100),
    "angsKe" VARCHAR(4),
    "form10Id" INTEGER NOT NULL,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form11" (
    "form0Id" INTEGER NOT NULL,
    "catatan" VARCHAR(255),
    "keterangan" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form11_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "pembiayaan" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100),
    "jumlahUnit" INTEGER NOT NULL,
    "collRendah" VARCHAR(100),
    "keterangan" VARCHAR(255),
    "form11Id" INTEGER NOT NULL,

    CONSTRAINT "pembiayaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_form10Id_fkey" FOREIGN KEY ("form10Id") REFERENCES "form10"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembiayaan" ADD CONSTRAINT "pembiayaan_form11Id_fkey" FOREIGN KEY ("form11Id") REFERENCES "form11"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;
