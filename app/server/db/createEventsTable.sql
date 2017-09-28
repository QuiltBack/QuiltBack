CREATE TABLE events(
Date DATE,
Time VARCHAR(50),
City TEXT,
State TEXT,
Zipcode INT,
Address TEXT,
Title VARCHAR(50),
Description TEXT,
ImageRef VARCHAR(50),
VolunteerInfo VARCHAR(50),
DonorInfo VARCHAR(50),
EventID SERIAL PRIMARY KEY,
);
