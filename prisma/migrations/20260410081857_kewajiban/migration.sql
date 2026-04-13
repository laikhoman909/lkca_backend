/*
  Warnings:

  - You are about to drop the column `angsuranAjukan` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `dsr` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `netIncome` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `pertimbangan` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `rekomendasi` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `totalAngsuran` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `totalPinjaman` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `totalPinjamanLain` on the `kewajiban` table. All the data in the column will be lost.
  - You are about to drop the column `income4` on the `pendapatan` table. All the data in the column will be lost.
  - Added the required column `key` to the `kewajiban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `kewajiban` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kewajiban" DROP COLUMN "angsuranAjukan",
DROP COLUMN "dsr",
DROP COLUMN "netIncome",
DROP COLUMN "pertimbangan",
DROP COLUMN "rekomendasi",
DROP COLUMN "totalAngsuran",
DROP COLUMN "totalPinjaman",
DROP COLUMN "totalPinjamanLain",
ADD COLUMN     "key" VARCHAR(100) NOT NULL,
ADD COLUMN     "value" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "pendapatan" DROP COLUMN "income4";
