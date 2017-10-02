
UPDATE events 
set Date=$2,StartTime=$3,Title=$4 ,Description=$5
,ImageRef=$6,VolunteerInfo=$7,DonorInfo=$8
,City=$9,State=$10,Zipcode=$11,address=$12,EndTime=$13,catalogue=$14,host=$15 
WHERE eventid=$1


RETURNING *;