import * as types from '../actions/ActionTypes';
import initialState from './initialState'
import {apiGetPosts} from '../services/apiServices';


export function getPosts(){
    return {
        type:types.GET_POSTS,
        payload:apiGetPosts()
    }
}


export default function rootReducer(state=initialState,action){
 console.log("action type: " + action.type);

 switch(action.type){
     case types.GET_POSTS + types.FULFILLED:
       return Object.assign({},state,{posts:action.payload});

     default:return state;
 }


}