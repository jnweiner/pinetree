CREATE DATABASE pinetree;

\c pinetree;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  sub VARCHAR(50),
  username VARCHAR(20),
  email VARCHAR(50)
);

CREATE TABLE hikes (
  id BIGSERIAL PRIMARY KEY,
  date VARCHAR(20),
  location VARCHAR(50),
  trail VARCHAR(50),
  distance INT,
  elevation INT,
  notes VARCHAR(500),
  user_id INT,
  FOREIGN KEY(user_id) references users(id)
);
