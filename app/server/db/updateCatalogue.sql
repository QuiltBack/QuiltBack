INSERT INTO events(catalogue)
    VALUES($1)

    RETURNING *;