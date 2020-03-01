import counterReducer from './counter';
import recentsReducer from './recents';
import {combineReducers} from 'redux';

const allReducer = combineReducers({
    counter : counterReducer,
    recents : recentsReducer
});

export default allReducer;