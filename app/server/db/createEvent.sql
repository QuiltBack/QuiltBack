INSERT INTO events(Date, StartTime, Title, Description
, ImageRef, VolunteerInfo, DonorInfo, City, State
, zipcode, address, EndTime, catalogue, host,users_id)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)

RETURNING *;