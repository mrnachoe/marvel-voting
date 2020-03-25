import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {vote} from "../../../actions/vote";
import {fetchSession} from "../../../actions/session";
import {fetchVotes} from "../../../actions/votes";
import {cookieName} from "../../../constants/cookies";
import {useDispatch, useSelector} from "react-redux";
import {map, countBy} from "lodash";
import styled from "styled-components";
import {useCookies} from "react-cookie";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #6b6e60;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
  background-color: white;
  justify-content: space-between;
`;

const VoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
`;

const VoteLabel = styled.div`
    flex: 1;
    padding-bottom: 5px;
`;

const VoteCount = styled.div`
    flex: 1;
    padding-bottom: 5px;
`;

const Button = styled.button`
    flex: 1;
    padding-bottom: 5px;
`;

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