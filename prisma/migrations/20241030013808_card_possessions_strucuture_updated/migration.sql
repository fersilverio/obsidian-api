/*
  Warnings:

  - You are about to drop the `CardPossessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CardPossessions`;

-- CreateTable
CREATE TABLE `card_possessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `associate_user_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `card_possessions` ADD CONSTRAINT `card_possessions_associate_user_id_fkey` FOREIGN KEY (`associate_user_id`) REFERENCES `associate_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card_possessions` ADD CONSTRAINT `card_possessions_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
