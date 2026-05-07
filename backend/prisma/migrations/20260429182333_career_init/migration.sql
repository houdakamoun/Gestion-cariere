/*
  Warnings:

  - Added the required column `baseSalary` to the `Career` table without a default value. This is not possible if the table is not empty.
  - Made the column `position` on table `career` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Assignment_formationId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Assignment_userId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Formation_trainerId_fkey` ON `formation`;

-- AlterTable
ALTER TABLE `career` ADD COLUMN `baseSalary` INTEGER NOT NULL,
    ADD COLUMN `level` INTEGER NULL,
    MODIFY `position` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Formation` ADD CONSTRAINT `Formation_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_formationId_fkey` FOREIGN KEY (`formationId`) REFERENCES `Formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
