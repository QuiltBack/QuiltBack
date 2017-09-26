import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function general(state = initialState, action) {
    switch(action.type) {
        default: 
            return Object.assign({}, state)
    }
}