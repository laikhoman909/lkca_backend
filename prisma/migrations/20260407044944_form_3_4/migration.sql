/*
  Warnings:

  - The `status_ada` column on the `dokumen_persyaratan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "dokumen_persyaratan" DROP COLUMN "status_ada",
ADD COLUMN     "status_ada" BOOLEAN NOT NULL DEFAULT false;
