SELECT *,users.username FROM comments JOIN users on users.users_id = comments.users_id WHERE post_id=$1;
