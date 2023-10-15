/*
  Warnings:

  - You are about to drop the column `anunciosID` on the `Candidaturas` table. All the data in the column will be lost.
  - Added the required column `anuncioID` to the `Candidaturas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Candidaturas` DROP FOREIGN KEY `Candidaturas_anunciosID_fkey`;

-- AlterTable
ALTER TABLE `Candidaturas` DROP COLUMN `anunciosID`,
    ADD COLUMN `anuncioID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Candidaturas` ADD CONSTRAINT `Candidaturas_anuncioID_fkey` FOREIGN KEY (`anuncioID`) REFERENCES `Anuncios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
