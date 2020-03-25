import {combineReducers} from 'redux';
import sessions from './sessions';
import session from './session';
import votes from './votes';


const rootReducer = combineReducers({
  sessions,
  session,
  votes,
});

export default rootReducer;