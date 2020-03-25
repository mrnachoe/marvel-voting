import * as types from '#root/constants/ActionTypes';
/**
 * Comment
 * No need to use axios
 * Could've used "fetch"
 */
import axios from "axios";
/**
 * Comment
 * No doc blocks or comments explaining what these functions do
 * Someone entering this project needs to go through and investigate what each one does and where it does it
 */
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

export const fetchSessions = () => async (dispatch) => {
    dispatch(requestSessions());

    await axios.get("http://localhost:7000/sessions").then((response) => {
        dispatch(receiveSessions(response.data));
    })
};

