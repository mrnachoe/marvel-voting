import React, {useEffect} from "react";
import {fetchSessions} from "../../../actions/sessions";
import {useSelector, useDispatch} from "react-redux";
import {map, get} from "lodash"
import styled from "styled-components";
import {Link} from "react-router-dom"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #6b6e60;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
  background-color: white;
  justify-content: space-between;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardLabel = styled.div`
  font-weight: 500;
`;

const CardLink = styled(Link)`
  display: flex;
  text-decoration: none;
  cursor: pointer;
  
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      cursor: pointer;
  }
`;

const VoteSessions = () => {
  const {sessions} = useSelector(state => state.sessions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSessions());
  }, []);

  return map(sessions, (voteSess, key) => {
    const characters = get(voteSess, 'characters');
    return <CardWrapper key={key}>
        <CardMeta>
          <CardLabel>Session: {key}</CardLabel>
          <ul>
          {
            map(characters, character => {
              return <li key={character}>{character}</li>
            })
          }
          </ul>
        </CardMeta>

        <CardLink to={`/vote/${key}`}>Vote on this</CardLink>
    </CardWrapper>
  });
};

export default VoteSessions;