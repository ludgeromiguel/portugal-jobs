/*
  Warnings:

  - You are about to drop the column `usersId` on the `Anuncios` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Candidaturas` table. All the data in the column will be lost.
  - Added the required column `ownerID` to the `Anuncios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerID` to the `Candidaturas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Anuncios` DROP FOREIGN KEY `Anuncios_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `Candidaturas` DROP FOREIGN KEY `Candidaturas_usersId_fkey`;

-- AlterTable
ALTER TABLE `Anuncios` DROP COLUMN `usersId`,
    ADD COLUMN `ownerID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Candidaturas` DROP COLUMN `usersId`,
    ADD COLUMN `ownerID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Anuncios` ADD CONSTRAINT `Anuncios_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidaturas` ADD CONSTRAINT `Candidaturas_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
