INSERT INTO posts (post_title, deleted, users_id, post_text, flagged,imageref,post_date)
		VALUES ($1,null,$2,$3,false,$4,$5)

RETURNING *; 