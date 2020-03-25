import * as types from '#root/constants/ActionTypes';
import axios from "axios";
import {receiveSessions} from "./sessions"
import {BASE_API_URL} from "../constants/config";

/**
 * Comment
 * No doc blocks or comments explaining what these functions do
 * Someone entering this project needs to go through and investigate what each one does and where it does it
 */
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

export const submitSession = () => {
    return {
        type: types.REQUEST + types.SESSION
    }
};

export const fetchSession = (id) => async (dispatch) => {
    dispatch(requestSession());

    await axios.get(`${BASE_API_URL}/sessions/${id}`).then((response) => {
        dispatch(receiveSession(response.data));
    })
};

export const makeSession = () => async (dispatch) => {
    dispatch(submitSession());

    await axios.post(`${BASE_API_URL}/sessions`).then((response) => {
        dispatch(receiveSessions(response.data));
    })
};

