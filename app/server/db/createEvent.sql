INSERT INTO events(Date, Time, Title, Description, ImageRef, VolunteerInfo, DonorInfo, City, State, Zipcode, address)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)

RETURNING *;