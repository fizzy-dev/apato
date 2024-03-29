CREATE TABLE Apartment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ownerId BIGINT,
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

ALTER TABLE User ADD lastName VARCHAR (50) NOT NULL;

ALTER TABLE User ADD firstName VARCHAR (50) NOT NULL;