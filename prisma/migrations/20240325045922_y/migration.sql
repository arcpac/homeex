/*
  Warnings:

  - You are about to drop the column `payeeId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Item_payeeId_key` ON `Item`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `payeeId`,
    ADD COLUMN `ownerId` INTEGER NOT NULL;
