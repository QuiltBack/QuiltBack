INSERT INTO posts (post_id,post_title, deleted, owner_id, post_text, flagged)
		VALUES ($1,$2,$3,null,$4,false)

RETURNING *; 