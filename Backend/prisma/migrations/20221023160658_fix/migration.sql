/*
  Warnings:

  - You are about to drop the column `anunciosId` on the `Candidaturas` table. All the data in the column will be lost.
  - Added the required column `anunciosID` to the `Candidaturas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Candidaturas` DROP FOREIGN KEY `Candidaturas_anunciosId_fkey`;

-- AlterTable
ALTER TABLE `Candidaturas` DROP COLUMN `anunciosId`,
    ADD COLUMN `anunciosID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Candidaturas` ADD CONSTRAINT `Candidaturas_anunciosID_fkey` FOREIGN KEY (`anunciosID`) REFERENCES `Anuncios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
