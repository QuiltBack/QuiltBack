DELETE FROM newsletter
  WHERE email = ($1)

RETURNING *;