-- AlterTable
ALTER TABLE `users` MODIFY `roleLevel` ENUM('user', 'admin') NULL DEFAULT 'user';
