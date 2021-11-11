CREATE DATABASE database_Users;

--\c into database_Users

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE players (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL
);