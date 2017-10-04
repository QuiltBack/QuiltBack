UPDATE users
SET username = $1

RETURNING *;