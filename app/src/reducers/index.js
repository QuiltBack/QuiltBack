import {combineReducers} from 'redux';
import general from './generalReducer';

const rootReducer = combineReducers({
    general
});

export default rootReducer;