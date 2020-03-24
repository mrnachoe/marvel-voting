import * as types from '#root/constants/ActionTypes';

export const requestVote = ({email, password}) => {
    return {
        type: types.REQUEST + types.POLL,
        email: email
    }
};

export const receiveVote = (user) => {
    return {
        type: types.RECEIVE + types.POLL,
        user
    }
};


export const errorVote = (errorMessage) => {
    return {
        type: types.ERROR + types.POLL,
        error: errorMessage
    }
};