select count (post_id)
from posts
where users_id = $1;