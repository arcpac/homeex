/*
  Warnings:

  - You are about to drop the column `itemId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payeeId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payeeId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `payeeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `itemId`;

-- CreateTable
CREATE TABLE `ItemPayers` (
    `itemId` INTEGER NOT NULL,
    `payerId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`itemId`, `payerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Item_payeeId_key` ON `Item`(`payeeId`);
