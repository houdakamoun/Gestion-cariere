/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `assignment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Assignment_formationId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Assignment_userId_formationId_key` ON `assignment`;

-- DropIndex
DROP INDEX `Formation_trainerId_fkey` ON `formation`;

-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `assignedAt`,
    ADD COLUMN `status` ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'NOT_STARTED';

-- AddForeignKey
ALTER TABLE `Formation` ADD CONSTRAINT `Formation_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_formationId_fkey` FOREIGN KEY (`formationId`) REFERENCES `Formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
