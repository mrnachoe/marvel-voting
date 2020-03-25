import React, {useEffect} from "react";
import {fetchSessions} from "../../../actions/sessions";
import {useDispatch, useSelector} from "react-redux";
import {get, map} from "lodash";
import { CardLabel, CardLink, CardMeta, CardWrapper } from './style';

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