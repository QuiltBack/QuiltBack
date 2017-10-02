import axios from 'axios';

const localApiUrl ='http://localhost:3001'


const api = axios.create({
    withCredentials:true

});

export function apiCreateEvent(event){

    return axios.post(localApiUrl + '/api/event', {event:event})
    .then(response=>{
        console.log("response");
        console.log(response);
        return response;
    })

}

export function apiGetNextEventPage(page,limit){
    return axios.get(localApiUrl + '/api/eventpage/' + limit + '/' + page+1)
       .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}
export function apiGetEventPage(page,limit){
    console.log(`
    page is ${page}
    limit is ${limit}
    `)
    return axios.get(localApiUrl + '/api/eventpage/' + limit + '/' + page)
       .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}



export function apiGetNextPostPage(page,limit){
    return axios.get(localApiUrl + '/api/postpage/' + limit + '/' + page)
       .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}



export function apiGetPostDetail(postId){
    return axios.get(localApiUrl + '/api/post/' + postId)
          .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}


export function apiGetEventDetail(eventId){
return axios.get(localApiUrl + '/api/event/' + eventId)
             .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })

}
export function apiGetPosts(){
    console.log("inside apiGetPosts");
    return axios.get(localApiUrl + '/api/posts')
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
    return axios.get(localApiUrl + '/api/subscriber')
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
    return axios.get(localApiUrl + '/api/events')
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

export function apiGetEventById(eventid){
    //app.get('/api/event/:eventId',CTRL.getEvent);
    console.log("inside apiGetEventById");
    return axios.get(localApiUrl + '/api/event/' + eventid)
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

export function apiGetAddress(){
    console.log('inside getAddress');
    return axios.get(localApiUrl + '/api/address')
        .then(response=>{
            console.log('address' + response);
            
            return response.data;
        })
        .catch(err=>{
            console.log('getAddress error' + err);
        })
}

export function apiAuthUser(){
    console.log('inside getAddress');
    return api.get(localApiUrl + '/auth/me')
        .then(response=>{
            console.log('auth/me' + response);
            return response.data;
        })
        .catch(err=>{
            console.log('getAddress error' + err);
        })
}



