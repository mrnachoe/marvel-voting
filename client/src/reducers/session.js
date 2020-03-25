import {RECEIVE, REQUEST, SESSION} from '../constants/ActionTypes';

const session = (state = {session: {}}, action) => {
  switch (action.type) {
    case REQUEST + SESSION:
      return {
        ...state
      };
    case RECEIVE + SESSION:
      return {
        ...state,
        session: action.session
      };
    default:
      return state;
  }
};

export default session;