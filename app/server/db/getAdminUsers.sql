select users.*, count(posts.post_id) as post_count from users
join posts on posts.users_id = users.users_id
group by users.users_id;
