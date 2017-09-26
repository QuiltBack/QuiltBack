import * as types from '../actions/ActionTypes';
import initialState from './initialState'
import {apiGetPosts,apiGetEvents} from '../services/apiServices';


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


export default function rootReducer(state=initialState,action){
 console.log("action type: " + action.type);

 switch(action.type){
     case types.GET_EVENTS + types.FULFILLED:
     return Object.assign({},state,{events:action.payload});
     
     case types.GET_POSTS + types.FULFILLED:
       return Object.assign({},state,{posts:action.payload});

     default:return state;
 }


}