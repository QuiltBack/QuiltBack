import * as types from '../actions/ActionTypes';
import initialState from './initialState'
<<<<<<< HEAD
import {apiGetUsersPosts,apiGetUsersEvents,apiGetComments,apiAddComment,apiLogout,apiGetUser,apiGetEventPage,apiGetNextEventPage,apiGetNextPostPage,apiGetPostDetail,apiGetEventDetail,apiGetSubscribers,apiRemoveSubscriber,apiAddSubscriber,apiGetPosts,apiGetEvents, apiGetAddress} from '../services/apiServices';
=======
import {apiEditAccount,apiGetComments,apiAddComment,apiLogout,apiGetUser,apiGetEventPage,apiGetNextEventPage,apiGetNextPostPage,apiGetPostDetail,apiGetEventDetail,apiGetSubscribers,apiRemoveSubscriber,apiAddSubscriber,apiGetPosts,apiGetEvents, apiGetAddress} from '../services/apiServices';
>>>>>>> master

export function getComments(postId){
    console.log("REDUCER postid" +postId);
  return {
      type:types.GET_COMMENTS,
      payload:apiGetComments(postId)
  }

}
export function addComment(comment){
     return {
         type:types.ADD_COMMENT,
         payload:apiAddComment(comment)
     }
}


export function logout(){
    return{
        type:types.LOGOUT,
        payload:apiLogout()
    }
}

export function getUser(){
        return {
                type:types.GET_USER,
                payload:apiGetUser()
        }
}



export function getPostDetail(postId){
   return {
       type: types.GET_POST_DETAIL,
       payload: apiGetPostDetail(postId)
   }
}
export function getAddress(){
    console.log('inside reducer');
    return{
        type:types.GET_ADDRESS,
        payload: apiGetAddress()
    }
}

export function getEventPage(page,limit){
    return {
        type:types.GET_EVENT_PAGE,
        payload:apiGetEventPage(page,limit)
    }
}
export function getNextEventPage(page,limit){
    return {
        type:types.GET_NEXT_EVENT_PAGE,
        payload:apiGetNextEventPage(page,limit)
    }
}
export function getNextPostPage(page,limit){
    return {
        type:types.GET_NEXT_POST_PAGE,
        payload:apiGetNextPostPage(page,limit)
    }
}

export function getPosts(){
    return {
        type:types.GET_POSTS,
        payload:apiGetPosts()
    }
}

export function getEvents(){
    return {
        type:types.GET_EVENTS,
        payload:apiGetEvents()
    }
}

export function addSubscriber(email){
    console.log("will call api function with " +email);
      return {
          type:types.ADD_SUBSCRIBER,
          payload:apiAddSubscriber(email)
      }
}
export function getSubscribers(){
    return {
        type:types.GET_SUBSCRIBERS,
        payload:apiGetSubscribers()
    }
}
export function removeSubscriber(email){
    return {
        type:types.REMOVE_SUBSCRIBER,
        payload:apiRemoveSubscriber(email)
    }
}
export function getEventDetail(event_id){
    return {
        type:types.GET_EVENT_DETAIL,
        payload:apiGetEventDetail(event_id)
    }
}
export function getUsersEvents(users_id) {
    console.log('inside reducer')
    return {
        type:types.GET_USERS_EVENTS,
        payload:apiGetUsersEvents(users_id)
    }
}
export function getUsersPosts(users_id) {
    return {
        type:types.GET_USERS_POSTS,
        payload:apiGetUsersPosts(users_id)
}
export function editAccount(users_id,nickname,contactemail,number,imageref){
    return{
        type:types.EDIT_ACCOUNT,
        payload:apiEditAccount(users_id,nickname,contactemail,number,imageref)
    }
}


export default function rootReducer(state=initialState,action){
 console.log("action type: " + action.type);

 switch(action.type){

    case types.GET_COMMENTS + types.FULFILLED:
      return Object.assign({},state,{comments:action.payload});
    case types.ADD_COMMENT + types.FULFILLED:
     return Object.assign({},state,{comments:action.payload});

 case types.LOGOUT + types.FULFILLED:
    return Object.assign({},state,{user:{}});
 case types.GET_USER + types.FULFILLED:

           return Object.assign({},state,{user:action.payload});

     case types.GET_EVENT_PAGE + types.FULFILLED:
       return Object.assign({},state,{postDetail:null,eventDetail:null,postPage:0,events:action.payload});
   
     case types.GET_NEXT_EVENT_PAGE + types.FULFILLED:
       return Object.assign({},state,{postDetail:null,eventDetail:null,eventPage:state.eventPage +1,postPage:0,events:action.payload});
     case types.GET_NEXT_POST_PAGE + types.FULFILLED:
       return Object.assign({},state,{postDetail:null,eventDetail:null,postPage:state.postPage +1,eventPage:0,posts:action.payload});

     case types.GET_POST_DETAIL + types.FULFILLED:

        return Object.assign({},state,{postDetail:action.payload});
     case types.GET_EVENT_DETAIL + types.FULFILLED:
         return Object.assign({},state,{eventDetail:action.payload});

    case types.ADD_SUBSCRIBER + types.FULFILLED:
    console.log("apiAddSubscriber FULFILLED");
        return Object.assign({},state,{subscriberEmail:action.payload});
    case types.REMOVE_SUBSCRIBER +types.PENDING:
      return Object.assign({},state,{subscriberEmail:'pending'})
    case types.REMOVE_SUBSCRIBER + types.FULFILLED:
         return Object.assign({},state,{subscriberEmail:''});
    case types.GET_SUBSCRIBERS + types.FULFILLED:
         return Object.assign({},state,{emailList:action.payload})


    case types.GET_EVENTS + types.FULFILLED:
        return Object.assign({},state,{events:action.payload});
     
<<<<<<< HEAD
    case types.GET_POSTS + types.FULFILLED:
        return Object.assign({},state,{posts:action.payload});
    case types.GET_USERS_EVENTS + types.FULFILLED:
        console.log('fulfilled');
        return Object.assign({},state,{events:action.payload});
    case types.GET_USERS_POSTS + types.FULFILLED:
        return Object.assign({},state,{posts:action.payload});
=======
     case types.GET_POSTS + types.FULFILLED:
       return Object.assign({},state,{posts:action.payload});
      case types.EDIT_ACCOUNT + types.FULFILLED:
        return Object.assign({},state,{usersInfo: action.payload})
>>>>>>> master

     default:return state;
 }


}