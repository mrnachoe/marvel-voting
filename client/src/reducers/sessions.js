import {RECEIVE, REQUEST, SESSIONS} from '../constants/ActionTypes';

const sessions = (state = { sessions: {}}, action) => {
    switch (action.type) {
        case REQUEST + SESSIONS:
            return {
                ...state
            };
        case RECEIVE + SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            };
        default:
            return state;
    }
};

export default sessions;