/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `date_naissance` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `date_naissance` DATETIME(3) NOT NULL,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenom` VARCHAR(191) NOT NULL;
