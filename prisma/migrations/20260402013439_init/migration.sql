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
CREATE TABLE "key_value" (
    "id" SERIAL NOT NULL,
    "group" VARCHAR(100) NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(255),
    "CustomValue" VARCHAR(255),
    "isPreset" BOOLEAN NOT NULL DEFAULT false,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "key_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_list" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "data1" VARCHAR(255),
    "data2" VARCHAR(255),
    "data3" VARCHAR(255),
    "data4" VARCHAR(255),
    "form0Id" INTEGER,

    CONSTRAINT "key_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form0" (
    "id" SERIAL NOT NULL,
    "TanggalTelepon" TIMESTAMP(3) NOT NULL,
    "JamTelepon" VARCHAR(10) NOT NULL,
    "Cabang" VARCHAR(100) NOT NULL,
    "NamaCmo" VARCHAR(255) NOT NULL,
    "FidCmo" INTEGER NOT NULL,
    "NamaDebitur" VARCHAR(255) NOT NULL,
    "NamaDealer" VARCHAR(255) NOT NULL,
    "Msub" VARCHAR(100) NOT NULL,
    "StatusCaDebId" INTEGER,
    "JenisPengajuanId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form0_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form1" (
    "id" SERIAL NOT NULL,
    "formRefId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form1_susunan_pengurus" (
    "id" SERIAL NOT NULL,
    "NamaJabatan" VARCHAR(255),
    "BesarSaham" VARCHAR(100),
    "Persen" VARCHAR(20),
    "Hubungan" VARCHAR(100),
    "Keterangan" VARCHAR(255),
    "form1Id" INTEGER NOT NULL,

    CONSTRAINT "form1_susunan_pengurus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form5" (
    "id" SERIAL NOT NULL,
    "formRefId" INTEGER NOT NULL,
    "HargaOtr" VARCHAR(100),
    "BesarDownPayment" VARCHAR(100),
    "NamaTeleponPenjual" VARCHAR(255),
    "HasilKonfirmasiPenjual" TEXT,
    "KapanMemilikiMobil" VARCHAR(100),
    "BerapaHargaBeli" VARCHAR(100),
    "BesarKebutuhanDana" VARCHAR(100),
    "TujuanKebutuhanDana" VARCHAR(255),
    "PosisiBpkb" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form6" (
    "id" SERIAL NOT NULL,
    "formRefId" INTEGER NOT NULL,
    "NamaPerusahaan" VARCHAR(255),
    "JenisUsaha" VARCHAR(255),
    "AlamatUsahaKantor" VARCHAR(255),
    "AlamatPool" VARCHAR(255),
    "TeleponHpEmail" VARCHAR(100),
    "UsahaPekerjaanSebelumnya" VARCHAR(255),
    "UraianUsaha1" TEXT,
    "UraianUsaha2" TEXT,
    "UraianUsaha3" TEXT,
    "ECallRekanan" TEXT,
    "ECallLainnya" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Form1KeyValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form1KeyValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form5KeyValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form5KeyValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form6KeyValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form6KeyValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "key_value_group_label_key" ON "key_value"("group", "label");

-- CreateIndex
CREATE INDEX "key_list_form0Id_idx" ON "key_list"("form0Id");

-- CreateIndex
CREATE INDEX "form1_susunan_pengurus_form1Id_idx" ON "form1_susunan_pengurus"("form1Id");

-- CreateIndex
CREATE INDEX "_Form1KeyValues_B_index" ON "_Form1KeyValues"("B");

-- CreateIndex
CREATE INDEX "_Form5KeyValues_B_index" ON "_Form5KeyValues"("B");

-- CreateIndex
CREATE INDEX "_Form6KeyValues_B_index" ON "_Form6KeyValues"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_list" ADD CONSTRAINT "key_list_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form0" ADD CONSTRAINT "form0_StatusCaDebId_fkey" FOREIGN KEY ("StatusCaDebId") REFERENCES "key_value"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form0" ADD CONSTRAINT "form0_JenisPengajuanId_fkey" FOREIGN KEY ("JenisPengajuanId") REFERENCES "key_value"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1_susunan_pengurus" ADD CONSTRAINT "form1_susunan_pengurus_form1Id_fkey" FOREIGN KEY ("form1Id") REFERENCES "form1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1KeyValues" ADD CONSTRAINT "_Form1KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1KeyValues" ADD CONSTRAINT "_Form1KeyValues_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form5KeyValues" ADD CONSTRAINT "_Form5KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form5"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form5KeyValues" ADD CONSTRAINT "_Form5KeyValues_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form6KeyValues" ADD CONSTRAINT "_Form6KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form6"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form6KeyValues" ADD CONSTRAINT "_Form6KeyValues_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;
