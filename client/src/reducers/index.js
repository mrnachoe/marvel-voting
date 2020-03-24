import { combineReducers } from 'redux';
import voter from './voter';
import sessions from './sessions';
import session from './session';


const rootReducer = combineReducers({
    voter,
    sessions,
    session
});

export default rootReducer;