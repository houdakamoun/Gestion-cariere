-- DropIndex
DROP INDEX `Formation_trainerId_fkey` ON `formation`;

-- AddForeignKey
ALTER TABLE `Formation` ADD CONSTRAINT `Formation_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;
