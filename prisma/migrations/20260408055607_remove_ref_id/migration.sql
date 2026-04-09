/*
  Warnings:

  - The primary key for the `form1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formRefId` on the `form1` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `form1` table. All the data in the column will be lost.
  - The primary key for the `form2` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formRefId` on the `form2` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `form2` table. All the data in the column will be lost.
  - The primary key for the `form5` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formRefId` on the `form5` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `form5` table. All the data in the column will be lost.
  - The primary key for the `form6` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formRefId` on the `form6` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `form6` table. All the data in the column will be lost.
  - You are about to drop the column `isSelected` on the `key_value` table. All the data in the column will be lost.
  - Added the required column `form0Id` to the `form1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form0Id` to the `form2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form0Id` to the `form5` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form0Id` to the `form6` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangBu" DROP CONSTRAINT "_Form1LatarBelakangBu_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form1LatarBelakangPribadi" DROP CONSTRAINT "_Form1LatarBelakangPribadi_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form5KeyValues" DROP CONSTRAINT "_Form5KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "_Form6KeyValues" DROP CONSTRAINT "_Form6KeyValues_A_fkey";

-- DropForeignKey
ALTER TABLE "dokumen_persyaratan" DROP CONSTRAINT "dokumen_persyaratan_form2Id_fkey";

-- DropForeignKey
ALTER TABLE "form1_susunan_pengurus" DROP CONSTRAINT "form1_susunan_pengurus_form1Id_fkey";

-- DropForeignKey
ALTER TABLE "key_list" DROP CONSTRAINT "key_list_form2Id_fkey";

-- AlterTable
ALTER TABLE "form1" DROP CONSTRAINT "form1_pkey",
DROP COLUMN "formRefId",
DROP COLUMN "id",
ADD COLUMN     "form0Id" INTEGER NOT NULL,
ADD CONSTRAINT "form1_pkey" PRIMARY KEY ("form0Id");

-- AlterTable
ALTER TABLE "form2" DROP CONSTRAINT "form2_pkey",
DROP COLUMN "formRefId",
DROP COLUMN "id",
ADD COLUMN     "form0Id" INTEGER NOT NULL,
ADD CONSTRAINT "form2_pkey" PRIMARY KEY ("form0Id");

-- AlterTable
ALTER TABLE "form5" DROP CONSTRAINT "form5_pkey",
DROP COLUMN "formRefId",
DROP COLUMN "id",
ADD COLUMN     "form0Id" INTEGER NOT NULL,
ADD CONSTRAINT "form5_pkey" PRIMARY KEY ("form0Id");

-- AlterTable
ALTER TABLE "form6" DROP CONSTRAINT "form6_pkey",
DROP COLUMN "formRefId",
DROP COLUMN "id",
ADD COLUMN     "form0Id" INTEGER NOT NULL,
ADD CONSTRAINT "form6_pkey" PRIMARY KEY ("form0Id");

-- AlterTable
ALTER TABLE "key_value" DROP COLUMN "isSelected";

-- CreateTable
CREATE TABLE "form3" (
    "form0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form3_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "form4" (
    "form0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form4_pkey" PRIMARY KEY ("form0Id")
);

-- CreateTable
CREATE TABLE "_Form3KeyValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form3KeyValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Form4KeyValues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Form4KeyValues_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Form3KeyValues_B_index" ON "_Form3KeyValues"("B");

-- CreateIndex
CREATE INDEX "_Form4KeyValues_B_index" ON "_Form4KeyValues"("B");

-- AddForeignKey
ALTER TABLE "key_list" ADD CONSTRAINT "key_list_form2Id_fkey" FOREIGN KEY ("form2Id") REFERENCES "form2"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1_susunan_pengurus" ADD CONSTRAINT "form1_susunan_pengurus_form1Id_fkey" FOREIGN KEY ("form1Id") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_persyaratan" ADD CONSTRAINT "dokumen_persyaratan_form2Id_fkey" FOREIGN KEY ("form2Id") REFERENCES "form2"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1LatarBelakangPribadi" ADD CONSTRAINT "_Form1LatarBelakangPribadi_A_fkey" FOREIGN KEY ("A") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form1LatarBelakangBu" ADD CONSTRAINT "_Form1LatarBelakangBu_A_fkey" FOREIGN KEY ("A") REFERENCES "form1"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form3KeyValues" ADD CONSTRAINT "_Form3KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form3"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form3KeyValues" ADD CONSTRAINT "_Form3KeyValues_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form4KeyValues" ADD CONSTRAINT "_Form4KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form4"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form4KeyValues" ADD CONSTRAINT "_Form4KeyValues_B_fkey" FOREIGN KEY ("B") REFERENCES "key_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form5KeyValues" ADD CONSTRAINT "_Form5KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form5"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Form6KeyValues" ADD CONSTRAINT "_Form6KeyValues_A_fkey" FOREIGN KEY ("A") REFERENCES "form6"("form0Id") ON DELETE CASCADE ON UPDATE CASCADE;
