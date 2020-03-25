import {RECEIVE, REQUEST, VOTE} from '../constants/ActionTypes';

const vote = (state = {vote: {}}, action) => {
  switch (action.type) {
    case REQUEST + VOTE:
      return {
        ...state
      };
    case RECEIVE + VOTE:
      return {
        ...state,
        vote: action.vote
      };
    default:
      return state;
  }
};

export default vote;