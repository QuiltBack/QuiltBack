CREATE TABLE users (
  users_id SERIAL,
  user_type VARCHAR(50) DEFAULT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  auth_id VARCHAR,
  nickname TEXT,
  contactemail VARCHAR(50) NOT NULL,
  number VARCHAR NOT NULL,
  imageref VARCHAR,
  PRIMARY KEY (id)
);