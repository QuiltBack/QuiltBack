UPDATE posts
SET flagged = FALSE
WHERE users_id = $1;