CREATE DATABASE database_links;

USE database_links;

-- USERS TABLE -- 

CREATE TABLE `database_links`.`users` (
  `id` INT(11) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- LINKS TABLES --

CREATE TABLE `database_links`. `links` (
    `id` INT(11) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `user_id` INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
 
 ALTER TABLE links
        ADD PRIMARY KEY (id);

ALTER TABLE links
        MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE links;

CREATE TABLE `database_links`. `tablename` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);


ALTER TABLE tablename
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;