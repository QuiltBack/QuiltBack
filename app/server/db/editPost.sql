UPDATE posts SET post_title=$2, post_text=$4, post_date=$5,imageref=$6  WHERE  post_id=$1 and (users_id=$3 or $3 in (SELECT users_id from users where user_type='Admin'))
RETURNING *; 