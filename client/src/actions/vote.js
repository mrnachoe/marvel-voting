import * as types from '#root/constants/ActionTypes';
import axios from "axios";
import {receiveVotes} from "./votes"
import {BASE_API_URL} from "../constants/config";

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