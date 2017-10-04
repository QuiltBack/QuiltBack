UPDATE users
SET nickname = $2,
contactemail = $3,
number = $4,
imageref = $5

WHERE users_id = $1

RETURNING *;