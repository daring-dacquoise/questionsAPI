-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

--fix all default to null, make sure that makes sense
CREATE TABLE `Answers` (
  `id` INTEGER NULL AUTO_INCREMENT,
  `id_Question` INTEGER NOT NULL,
  `id_Users` INTEGER NOT NULL,
  `id_Album` INTEGER NOT NULL,
  `body` VARCHAR(1000) NOT NULL,
  `helpfulness` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Question'
--
-- ---

DROP TABLE IF EXISTS `Question`;

CREATE TABLE `Question` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Product` INTEGER NOT NULL,
  `id_Users` INTEGER NOT NULL,
  `body` VARCHAR(1000) NOT NULL,
  `date` DATE NOT NULL,
  `helpfulness` INTEGER NOT NULL,
  `reported` VARCHAR NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Product'
--
-- ---

DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photo'
--
-- ---

DROP TABLE IF EXISTS `Photo`;

CREATE TABLE `Photo` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `photo_Address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Album'
--
-- ---

DROP TABLE IF EXISTS `Album`;

CREATE TABLE `Album` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Photo` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Answers` ADD FOREIGN KEY (id_Question) REFERENCES `Question` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (id_Album) REFERENCES `Album` (`id`);
ALTER TABLE `Question` ADD FOREIGN KEY (id_Product) REFERENCES `Product` (`id`);
ALTER TABLE `Question` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Album` ADD FOREIGN KEY (id_Photo) REFERENCES `Photo` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Question` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photo` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Album` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Answers` (`id`,`id_Question`,`id_Users`,`id_Album`,`body`,`helpfulness`) VALUES
-- ('','','','','','');
-- INSERT INTO `Users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Question` (`id`,`id_Product`,`id_Users`,`body`,`date`,`helpfulness`,`reported`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Product` (`id`) VALUES
-- ('');
-- INSERT INTO `Photo` (`id`,`photo_Address`) VALUES
-- ('','');
-- INSERT INTO `Album` (`id`,`id_Photo`) VALUES
-- ('','');