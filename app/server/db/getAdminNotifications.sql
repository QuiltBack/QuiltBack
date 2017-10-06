select *, post_title
from posts inner join users on posts.users_id = users.users_id
where flagged = true;