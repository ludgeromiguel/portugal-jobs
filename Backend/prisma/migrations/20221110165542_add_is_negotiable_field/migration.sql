/*
  Warnings:

  - Added the required column `isNegotiable` to the `Anuncios` table without a default value. This is not possible if the table is not empty.
  - Made the column `salary` on table `Anuncios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Anuncios` ADD COLUMN `isNegotiable` BOOLEAN NOT NULL,
    MODIFY `salary` DOUBLE NOT NULL;
