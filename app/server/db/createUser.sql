insert into users (user_type, username, email, first_name, last_name, auth_id)
values ('User', $1, $2, $3, $4, $5)
    RETURNING *;