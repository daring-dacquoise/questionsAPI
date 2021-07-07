-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `body` VARCHAR(1000) NOT NULL,
  `date_written` INT NOT NULL,
  `answerer_name` VARCHAR(60) NOT NULL,
  `answerer_email` VARCHAR(60) NOT NULL,
  `reported` TINYINT  NOT NULL,
  `helpful` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `body` VARCHAR(1000) NOT NULL,
  `date_written` INT NOT NULL,
  `asker_name` VARCHAR(60) NOT NULL,
  `asker_email` VARCHAR(60) NOT NULL,
  `reported` TINYINT NOT NULL,
  `helpful` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_id` INT NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `answers` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (answer_id) REFERENCES `answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `answers` ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `questions` ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `answers` (`id`,`question_id`,`body`,`date_written`,`answerer_name`,`answerer_email`,`reported`,`helpful`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `questions` (`id`,`product_id`,`body`,`date_written`,`asker_name`,`asker_email`,`reported`,`helpful`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `photos` (`id`,`answer_id`,`url`) VALUES
-- ('','','');

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc_data/answers_photos.csv'
INTO TABLE answers_photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc_data/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc_data/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;