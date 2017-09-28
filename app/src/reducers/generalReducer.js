import * as types from '../actions/ActionTypes';
import initialState from './initialState'
import {apiGetSubscribers,apiRemoveSubscriber,apiAddSubscriber,apiGetPosts,apiGetEvents} from '../services/apiServices';


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


export default function rootReducer(state=initialState,action){
 console.log("action type: " + action.type);

 switch(action.type){
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