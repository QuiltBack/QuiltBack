create table comments(
  id SERIAL,
  users_id INT,
  date TIMESTAMP,
  post_id INT,
  text TEXT,
  imageref VARCHAR,
  FOREIGN KEY(users_id) REFERENCES users(users_id),
  FOREIGN KEY(post_id) REFERENCES posts(post_id),
);