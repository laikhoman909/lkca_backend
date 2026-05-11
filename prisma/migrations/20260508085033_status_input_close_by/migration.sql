/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `form0` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `form0` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nip` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requester` to the `form0` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('COMPLETE', 'UNCOMPLETE', 'CLOSED');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "nip" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("nip");

-- AlterTable
ALTER TABLE "form0" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "close_by" TEXT,
ADD COLUMN     "close_dt" TIMESTAMP(3),
ADD COLUMN     "input_by" TEXT,
ADD COLUMN     "input_dt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requester" TEXT NOT NULL,
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'UNCOMPLETE',
ADD COLUMN     "update_by" TEXT,
ADD COLUMN     "update_dt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Product";

-- AddForeignKey
ALTER TABLE "form0" ADD CONSTRAINT "form0_requester_fkey" FOREIGN KEY ("requester") REFERENCES "User"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1" ADD CONSTRAINT "form1_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form2" ADD CONSTRAINT "form2_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form3" ADD CONSTRAINT "form3_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form4" ADD CONSTRAINT "form4_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form5" ADD CONSTRAINT "form5_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form6" ADD CONSTRAINT "form6_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form7" ADD CONSTRAINT "form7_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form8" ADD CONSTRAINT "form8_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form9" ADD CONSTRAINT "form9_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form10" ADD CONSTRAINT "form10_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form11" ADD CONSTRAINT "form11_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form12" ADD CONSTRAINT "form12_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form13" ADD CONSTRAINT "form13_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form14" ADD CONSTRAINT "form14_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer" ADD CONSTRAINT "footer_form0Id_fkey" FOREIGN KEY ("form0Id") REFERENCES "form0"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
