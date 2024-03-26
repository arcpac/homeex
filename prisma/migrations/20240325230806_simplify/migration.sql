/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `ItemPayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `ownerId`;

-- DropTable
DROP TABLE `ItemPayers`;
