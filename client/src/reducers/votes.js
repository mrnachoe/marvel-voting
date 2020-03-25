import {RECEIVE, REQUEST, VOTES} from '../constants/ActionTypes';

const votes = (state = {votes: {}}, action) => {
  switch (action.type) {
    case REQUEST + VOTES:
      return {
        ...state
      };
    case RECEIVE + VOTES:
      return {
        ...state,
        votes: action.votes
      };
    default:
      return state;
  }
};

export default votes;