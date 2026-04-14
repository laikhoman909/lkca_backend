/*
  Warnings:

  - Changed the type of `value` on the `kewajiban` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "kewajiban" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "kewajiban_form7Id_idx" ON "kewajiban"("form7Id");
