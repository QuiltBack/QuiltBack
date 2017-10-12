UPDATE posts SET flagged = false
    WHERE post_id = $1;