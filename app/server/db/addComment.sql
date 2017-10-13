INSERT INTO comments (post_id,users_id,text,date) VALUES ($1,$2,$3,$4);
SELECT comments.*,users.username, users.imageref as imageref  FROM comments 
JOIN users on users.users_id = comments.users_id 
WHERE post_id=$1;
