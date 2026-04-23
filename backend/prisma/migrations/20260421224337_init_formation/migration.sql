/*
  Warnings:

  - You are about to drop the column `trainer` on the `formation` table. All the data in the column will be lost.
  - Added the required column `trainerId` to the `Formation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formation` DROP COLUMN `trainer`,
    ADD COLUMN `trainerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Formation` ADD CONSTRAINT `Formation_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
