INSERT INTO comments (post_id,users_id,text,date) VALUES ($1,$2,$3,$4)
RETURNING *;
