import * as types from '#root/constants/ActionTypes';
/**
 * Comment
 * No need to use axios
 * Could've used "fetch"
 */
import axios from "axios";
import {receiveVotes} from "./votes"
import {BASE_API_URL} from "../constants/config";
/**
 * Comment
 * No doc blocks or comments explaining what these functions do
 * Someone entering this project needs to go through and investigate what each one does and where it does it
 */
export const sendVote = (vote) => {
  return {
    type: types.SET + types.VOTE,
    ...vote
  }
};

export const receiveVote = () => {
  return {
    type:  types.RECEIVE + types.VOTES
  }
};

export const vote = ({characterId, sessionId, cookie}) => async (dispatch) => {
  dispatch(sendVote());
  axios.post(`${BASE_API_URL}/votes`, {
    characterId, sessionId, cookie
  }).then((response) => {
    dispatch(receiveVotes(response.data))
  })
};