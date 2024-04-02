/*
  Warnings:

  - You are about to drop the `ItemPayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ItemPayers`;

-- CreateTable
CREATE TABLE `_ItemToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemToTag_AB_unique`(`A`, `B`),
    INDEX `_ItemToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
