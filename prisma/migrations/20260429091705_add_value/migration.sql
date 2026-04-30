/*
  Warnings:

  - A unique constraint covering the columns `[group,value,CustomValue]` on the table `key_value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `key_value` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "key_value_group_label_CustomValue_key";

-- AlterTable
ALTER TABLE "key_value" ADD COLUMN     "value" VARCHAR(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "key_value_group_value_CustomValue_key" ON "key_value"("group", "value", "CustomValue");
