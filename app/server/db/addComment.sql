INSERT INTO comments (post_id,user_id,text,date) VALUES ($1,$2,$3,$4)
RETURNING *;
