INSERT INTO events(Date, Time, Location, Title, Description, ImageRef, VolunteerInfo, DonorInfo)
values($1,$2,$3,$4,$5,$6,$7,$8)

RETURNING *;