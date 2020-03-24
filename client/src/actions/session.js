import * as types from '#root/constants/ActionTypes';
import axios from "axios";

export const requestSession = () => {
    return {
        type: types.REQUEST + types.SESSION
    }
};

export const receiveSession = (session) => {
    return {
        type: types.RECEIVE + types.SESSION,
        session
    }
};

export const errorSessions = (errorMessage) => {
    return {
        type: types.ERROR + types.SESSION,
        error: errorMessage
    }
};

export const fetchSession = (id) => async (dispatch) => {
    dispatch(requestSession());

    await axios.get(`http://localhost:7000/session/${id}`).then((response) => {
        dispatch(receiveSession(response.data));
    })
};

