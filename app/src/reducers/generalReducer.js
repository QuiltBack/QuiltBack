import * as types from '../actions/ActionTypes';
import initialState from './initialState'
import {apiGetEventPage,apiGetNextEventPage,apiGetNextPostPage,apiGetPostDetail,apiGetEventDetail,apiGetSubscribers,apiRemoveSubscriber,apiAddSubscriber,apiGetPosts,apiGetEvents} from '../services/apiServices';

export function getPostDetail(postId){
   return {
       type: types.GET_POST_DETAIL,
       payload: apiGetPostDetail(postId)
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


export default function rootReducer(state=initialState,action){
 console.log("action type: " + action.type);

 switch(action.type){
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
     
     case types.GET_POSTS + types.FULFILLED:
       return Object.assign({},state,{posts:action.payload});

     default:return state;
 }


}