CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    post_title VARCHAR(50),
    post_date TIMESTAMP,
    deleted INT,
    owner_id SERIAL REFERENCES users (id),
    post_text VARCHAR,
    flagged BOOLEAN,
    views INT NOT NULL DEFAULT '0',
    users_id INT FOREIGN KEY REFERENCES users(users_id)
);