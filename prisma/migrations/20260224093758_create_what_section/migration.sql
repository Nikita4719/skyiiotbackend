-- CreateTable
CREATE TABLE `about_us` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` LONGTEXT NULL,
    `heading` LONGTEXT NULL,
    `paragraph` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aboutusbenefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading1` LONGTEXT NULL,
    `heading2` LONGTEXT NULL,
    `heading3` LONGTEXT NULL,
    `heading4` LONGTEXT NULL,
    `heading5` LONGTEXT NULL,
    `heading6` LONGTEXT NULL,
    `heading7` LONGTEXT NULL,
    `heading8` LONGTEXT NULL,
    `paragraph1` LONGTEXT NULL,
    `paragraph2` LONGTEXT NULL,
    `paragraph3` LONGTEXT NULL,
    `paragraph4` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aboutusenterprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` TEXT NULL,
    `paragraph` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ai_powered` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading1` TEXT NULL,
    `heading2` TEXT NULL,
    `heading3` TEXT NULL,
    `paragraph1` TEXT NULL,
    `paragraph2` TEXT NULL,
    `media` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cloudsection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` LONGTEXT NULL,
    `paragraph1` LONGTEXT NULL,
    `paragraph2` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faq_id` INTEGER NULL,
    `para` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `faq_id`(`faq_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `embedded` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` TEXT NULL,
    `paragraph1` LONGTEXT NULL,
    `paragraph2` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,
    `video` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `everywhere_slide` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NULL,
    `heading1` TEXT NULL,
    `heading2` TEXT NULL,
    `heading3` TEXT NULL,
    `heading4` TEXT NULL,
    `paragraph1` TEXT NULL,
    `paragraph2` TEXT NULL,
    `paragraph3` TEXT NULL,
    `paragraph4` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image_button_section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` VARCHAR(255) NULL,
    `paragraph` TEXT NULL,
    `image` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `managementsection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` LONGTEXT NULL,
    `paragraph1` LONGTEXT NULL,
    `paragraph2` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `networksection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` LONGTEXT NULL,
    `paragraph1` LONGTEXT NULL,
    `paragraph2` LONGTEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NULL,
    `heading1` TEXT NULL,
    `heading2` TEXT NULL,
    `heading3` TEXT NULL,
    `heading4` TEXT NULL,
    `heading5` TEXT NULL,
    `paragraph1` TEXT NULL,
    `paragraph2` TEXT NULL,
    `paragraph3` TEXT NULL,
    `paragraph4` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `our_team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading1` TEXT NULL,
    `heading2` TEXT NULL,
    `heading3` TEXT NULL,
    `heading4` TEXT NULL,
    `paragraph1` TEXT NULL,
    `paragraph2` TEXT NULL,
    `paragraph3` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `media` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `smarter_section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` LONGTEXT NULL,
    `para` LONGTEXT NULL,
    `media` VARCHAR(255) NULL,
    `media_type` ENUM('image', 'video') NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solution_cat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solution_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solution_sub_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solutionCatId` INTEGER NULL,
    `para1` TEXT NULL,
    `para2` TEXT NULL,
    `image2` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `solutionCatId`(`solutionCatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supported_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` TEXT NULL,
    `paragraph1` TEXT NULL,
    `paragraph2` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `image4` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` VARCHAR(255) NOT NULL,
    `para1` TEXT NULL,
    `para2` TEXT NULL,
    `image1` VARCHAR(255) NULL,
    `image2` VARCHAR(255) NULL,
    `image3` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `what_section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cms_faqs` ADD CONSTRAINT `cms_faqs_ibfk_1` FOREIGN KEY (`faq_id`) REFERENCES `faqs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `solution_sub_categories` ADD CONSTRAINT `solution_sub_categories_ibfk_1` FOREIGN KEY (`solutionCatId`) REFERENCES `solution_cat`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
