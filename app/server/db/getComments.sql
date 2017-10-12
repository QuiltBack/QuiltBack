select comments.*, users.imageref as imageref from comments
JOIN users ON (comments.users_id = users.users_id)
where post_id = $1;