create table comments(
  id SERIAL,
  users_id INT,
  date TIMESTAMP,
  post_id SERIAL,
  text TEXT,
  FOREIGN KEY(users_id) REFERENCES users(users_id)
);