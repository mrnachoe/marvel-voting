import * as types from '#root/constants/ActionTypes';
import axios from "axios";
import {BASE_API_URL} from "../constants/config";

export const requestVotes = () => {
  return {
    type: types.REQUEST + types.VOTES
  }
};

export const receiveVotes = (votes) => {
  return {
    type: types.RECEIVE + types.VOTES,
    votes
  }
};

export const fetchVotes = (sessionId) => async  (dispatch) => {
  dispatch(requestVotes());
  axios.get(`${BASE_API_URL}/votes/${sessionId}`).then((response) => {
    dispatch(receiveVotes(response.data));
  })
};