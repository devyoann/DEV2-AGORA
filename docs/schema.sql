

CREATE TABLE user (
	`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`lastname` VARCHAR(128),
	`firstname` VARCHAR(128),
	`email` VARCHAR(128),
	`birthdate` VARCHAR(128),
	`gender` INT,
	`password` VARCHAR(128)
);

INSERT INTO user (lastname, firstname, email, birthdate, gender, password) VALUES 
	('Caillot', 'Brieuc', 'brieuc@gmail.com', '31/12/1997', '1', 'psswordbidule');