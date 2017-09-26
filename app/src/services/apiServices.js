import axios from 'axios';

const localApiUrl ='http://localhost:3001'
const api = axios.create({
    withCredentials:true

});

export function apiGetPosts(){
    console.log("inside apiGetPosts");
    return api.get(localApiUrl + '/api/posts')
              .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
           
}



