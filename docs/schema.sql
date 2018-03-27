DROP DATABASE IF EXISTS agora;
CREATE DATABASE agora;
USE agora;

CREATE TABLE user (
	`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`lastname` VARCHAR(128),
	`firstname` VARCHAR(128),
	`email` VARCHAR(128),
	`birthdate` VARCHAR(128),
	`gender` INT,
	`password` VARCHAR(128),
	`repassword` VARCHAR(128)
);