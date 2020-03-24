import * as types from '#root/constants/ActionTypes';
import axios from "axios";

export const requestSessions = () => {
    return {
        type: types.REQUEST + types.SESSIONS
    }
};

export const receiveSessions = (sessions) => {
    return {
        type: types.RECEIVE + types.SESSIONS,
        sessions
    }
};

export const errorSessions = (errorMessage) => {
    return {
        type: types.ERROR + types.SESSION,
        error: errorMessage
    }
};

export const fetchSessions = () => async (dispatch) => {
    dispatch(requestSessions());

    await axios.get("http://localhost:7000/sessions").then((response) => {
        dispatch(receiveSessions(response.data));
    })
};

