import * as types from '#root/constants/ActionTypes';
/**
 * Comment
 * No need to use axios
 * Could've used "fetch"
 */
import axios from "axios";
import {BASE_API_URL} from "../constants/config";
/**
 * Comment
 * No doc blocks or comments explaining what these functions do
 * Someone entering this project needs to go through and investigate what each one does and where it does it
 */
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