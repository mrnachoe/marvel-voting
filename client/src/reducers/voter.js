import {CLEAR, VOTER} from '../constants/ActionTypes';

const voter = (state = {name: null, uuid: null}, action) => {
  switch (action.type) {
    case VOTER:
      return {
        ...state,
        name: action.name,
        uuid: action.uuid,
      };
    case CLEAR:
      return null;
    default:
      return state;
  }
};

export default voter;