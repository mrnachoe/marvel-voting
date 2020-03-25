import * as types from '#root/constants/ActionTypes';
import axios from "axios";
import {receiveSessions} from "./sessions"
import {BASE_API_URL} from "../constants/config";

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

