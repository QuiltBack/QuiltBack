import axios from 'axios';


const api = axios.create({
    withCredentials:true

});

export function apiAddPost(post){
  
   return axios.post('/api/post/',{post:post})
    .then(response=>{
        console.log('returning from post api/post');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in AddPost");
        console.log(err);

    })
}


export function apiAddComment(comment){
  
   return axios.post('/api/comment/',{comment:comment})
    .then(response=>{
        console.log('returning from post api/comment');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in AddComment");
        console.log(err);

    })
}
export function apiGetComments(postId){
   
   console.log("apiServices apiGetComments");
   console.log(postId);
    return axios.get( '/api/comments/' + postId)
     .then(response =>{
         console.log(response);
          return response.data;
        })
        .catch(err=>{
            console.log("auth me error");
            console.log(err)
            return '';    
        });
}
export function apiGetUser(){
        // debug try this
        //end debug try this
        return  api.get( '/auth/me')
                    .then(response =>{
                     return response.data;
                    })
                    .catch(err=>{
                            console.log("auth me error");
                            console.log(err)
                            return '';    
                    });
                            

}
export function apiLogout(){
        // debug try this
        //end debug try this
        return  api.get('/auth/logout')
                    .then(response =>{
                     return response.data;
                    })
                    .catch(err=>{
                            console.log("auth me error");
                            console.log(err)});

}


export function apiCreateEvent(event){

    return api.post( '/api/event', {event:event})
    .then(response=>{
        console.log("response");
        console.log(response);
        return response;
    })

}

export function apiGetNextEventPage(page,limit){
    return axios.get( '/api/eventpage/' + limit + '/' + page+1)
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
    return axios.get( '/api/eventpage/' + limit + '/' + page)
       .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}



export function apiGetNextPostPage(page,limit){
    return axios.get( '/api/postpage/' + limit + '/' + page)
       .then(response=>{
                  return response.data;
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}



export function apiGetPostDetail(postId){
    return axios.get( '/api/post/' + postId)
          .then(response=>{
                  return response.data[0];
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })
}


export function apiGetEventDetail(eventId){
return axios.get( '/api/event/' + eventId)
             .then(response=>{
            
                  return response.data[0];
              })
              .catch(err=>{
              console.log("apiGetPosts error");
              console.log(err);

            })

}
export function apiGetPosts(){
    console.log("inside apiGetPosts");
    return axios.get( '/api/posts')
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
    return axios.get( '/api/subscriber')
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
    return axios.post( '/api/subscriber',{email:email})
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
    return axios.delete( '/api/subscriber/' +email )
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
    return axios.get( '/api/events')
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
    return axios.get( '/api/event/' + eventid)
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
export function apiGetUsersEvents(users_id){
    console.log('inside getUsersEvents');
    return axios.get('/api/dashboard/events/' + users_id)
            .then(response=>{
                console.log('USER EVENTS');
                console.log(response);
                return response.data;
            })
            .catch(err=>{
                console.log('apiGetUsersEvents Error')
                console.log(err)
            })
}
export function apiGetUsersPosts(users_id){
    console.log('inside getUsersPosts');
    return axios.get('/api/dashboard/posts/' + users_id)
        .then(response=>{
            console.log('USERS POSTS');
            console.log(response);
            return response.data;
        })
        .catch(err=>{
            console.log('apiGetUsersPosts error');
            console.log(err);
        })
}
export function apiEditAccount(users_id,nickname,contactemail,number,imageref){
    console.log("adding nickname,contactemail,number,imageref" + nickname,contactemail,number,imageref);
    return axios.post ( '/api/dashboard/editAccount',
    {nickname:nickname, contactemail:contactemail, number:number, imageref:imageref}
    + users_id)
    .then(response=>{
        console.log('returning from post api/dashboard/editaccount');
        console.log(response);
        return response.data;
    })
    .catch(err=>{
        console.log ("error in EditAccount");
        console.log(err);

    })
}

export function apiGetAddress(){
    console.log('inside getAddress');
    return axios.get( '/api/address')
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
    return api.get( '/auth/me')
        .then(response=>{
            console.log('auth/me' + response);
            return response.data;
        })
        .catch(err=>{
            console.log('getAddress error' + err);
        })
}

export function apiGetAdminUsers(){
    console.log('inside get admin users');
    return axios.get('/api/users')
        .then(response=>{
            return response.data;
        })
        .catch(err=>{
            console.log('get users fpr admin error' + err)
        })
}
export function apiGetAdminPosts(){
    console.log('inside get admin posts');
    return axios.get('/api/userposts')
        .then(response=>{
            return response.data;
        })
        .catch(err=>{
            console.log('get admin posts' + err)
        })
}
export function apiGetAdminNotifications(){
    console.log('inside get admin notifications');
    return axios.get('/api/notifications')
        .then(response=>{
            return response.data;
        })
        .catch(err=>{
            console.log('get admin notifications' + err)
        })
}



