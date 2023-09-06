-- AlterTable
ALTER TABLE `users` ADD COLUMN `roleLevel` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
