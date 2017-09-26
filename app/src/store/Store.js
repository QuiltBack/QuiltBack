import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';


let createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

function configureStore(initialState){
  return createStoreWithMiddleware(rootReducer,initialState);
}
const Store =configureStore();

export default Store;

/* OLD May need to use configureStore */
/*
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
  );
}
*/
