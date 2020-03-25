import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {vote} from "../../../actions/vote";
import {fetchSession} from "../../../actions/session";
import {fetchVotes} from "../../../actions/votes";
import {cookieName} from "../../../constants/cookies";
import {useDispatch, useSelector} from "react-redux";
import {map, countBy} from "lodash";
import {useCookies} from "react-cookie";
import { CardWrapper, VoteWrapper, VoteCount, VoteLabel, Button } from './style';

const Vote = () => {
  const {id} = useParams();
  const {session} = useSelector(state => state.session);
  const {votes} = useSelector(state => state.votes);

  const dispatch = useDispatch();
  const [cookies] = useCookies([cookieName]);
  const currentCookie = cookies[cookieName];

  useEffect(() => {
    dispatch(fetchSession(id));
    dispatch(fetchVotes(id))
  }, []);

  if (!session) return "No sessions available";

  const {characters} = session;
  const voteCounts = countBy(votes, vote => {
    return vote.characterId;
  });

  return (
    <CardWrapper>
      {
        map(characters, (character, key) => {
          return <VoteWrapper key={key}>
            <VoteLabel>{character}</VoteLabel>
            <VoteCount>{voteCounts[key]}</VoteCount>
            <Button onClick={() => {
              dispatch(vote({
                characterId: key,
                sessionId: id,
                cookie: currentCookie
              }))
            }}>Vote</Button>
          </VoteWrapper>
        })
      }
    </CardWrapper>
  )
};

export default Vote;