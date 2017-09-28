INSERT INTO newsletter (email)
    VALUES ($1)

RETURNING *;