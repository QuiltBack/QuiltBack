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
export function apiGetSubscribers(){
    console.log("getting subscribers");
    return api.get(localApiUrl + '/api/subscriber')
    .then(response=>{
        console.log('returning from get api/subscriber');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in GetSubscriber");
        console.log(err);

    })
}


export function apiAddSubscriber(email){
    console.log("adding email " + email);
    return axios.post(localApiUrl + '/api/subscriber',{email:email})
    .then(response=>{
        console.log('returning from post api/subscriber');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in AddSubscriber");
        console.log(err);

    })
}

export function apiRemoveSubscriber(email){
    console.log("removingemail " + email);
    return axios.delete(localApiUrl + '/api/subscriber/' +email )
    .then(response=>{
        console.log('returning from delete  api/subscriber');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in AddSubscriber");
        console.log(err);

    })
}




export function apiGetEvents(){
    console.log("inside apiGetEvents");
    return api.get(localApiUrl + '/api/events')
              .then(response=>{
                  console.log("EVENTS");
                  console.log(response);
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetEvents error");
              console.log(err);

            })
           
}




