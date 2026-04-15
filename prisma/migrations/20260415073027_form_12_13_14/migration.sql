-- AlterTable
ALTER TABLE "aset" ADD COLUMN     "nama" TEXT;

-- CreateTable
CREATE TABLE "form12" (
    "form0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form12_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "kewajiban_luar" (
    "id" SERIAL NOT NULL,
    "bank" VARCHAR(255),
    "merk" VARCHAR(100),
    "besarAngsuran" INTEGER NOT NULL,
    "angsKe" INTEGER NOT NULL,
    "keterangan" VARCHAR(255),
    "form12Id" INTEGER NOT NULL,

    CONSTRAINT "kewajiban_luar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form13" (
    "form0Id" INTEGER NOT NULL,
    "dpGross" INTEGER NOT NULL,
    "hargaPasar" INTEGER NOT NULL,
    "hargaRata" INTEGER NOT NULL,
    "hargaReal" INTEGER NOT NULL,
    "hargaTerendah" INTEGER NOT NULL,
    "hargaTertinggi" INTEGER NOT NULL,
    "referensi" VARCHAR(100),
    "ltv" INTEGER NOT NULL,
    "sph" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form13_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "form14" (
    "form0Id" INTEGER NOT NULL,
    "positifPoin" VARCHAR(100),
    "negatifPoin" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form14_pkey" PRIMARY KEY ("form0Id")
);

-- AddForeignKey
ALTER TABLE "kewajiban_luar" ADD CONSTRAINT "kewajiban_luar_form12Id_fkey" FOREIGN KEY ("form12Id") REFERENCES "form12"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;
