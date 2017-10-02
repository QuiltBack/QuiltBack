CREATE TABLE users (
  users_id SERIAL,
  user_type varchar(50) DEFAULT NULL,
  username varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  auth_id varchar,
  PRIMARY KEY (id)
);