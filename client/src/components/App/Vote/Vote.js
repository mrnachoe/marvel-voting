import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchSession} from "../../../actions/session";
import {useSelector, useDispatch} from "react-redux";
import {map} from "lodash";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #6b6e60;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
  background-color: white;
  justify-content: space-between;
`;

const VoteLabel = styled.div`
    padding-bottom: 5px;
`;

const Vote = () => {
    const {id} = useParams();
    const {session} = useSelector(state => state.session);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSession(id));
    },[]);

    const {characters} = session;

    return (
        <CardWrapper>
            {
                map(characters, (character, key) => {
                    return <VoteLabel key={key}>{character}</VoteLabel>
                })
            }
        </CardWrapper>
    )
};

export default Vote;