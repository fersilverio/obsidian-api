-- AlterTable
ALTER TABLE `associate_users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
