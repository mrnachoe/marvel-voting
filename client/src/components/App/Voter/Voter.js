import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addVoter, removeVoter} from "#root/actions/voter";
import { v4 as uuidv4 } from 'uuid';

const VoterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled.input`
  border: 1px solid lightgrey;
  box-sizing: border-box;
  display: block;
  font-size: .9rem;
  padding: .25rem;
  width: 100%;
`;

const Button = styled.button`
  margin-top: .5rem;
`;

const Voter = () => {
    const dispatch = useDispatch();
    const voter = useSelector(state => state.voter);
    const [name, setName] = useState('');

    if (voter && voter.name) return (
        <Label>Welcome Jesse <Button onClick={() => {dispatch(removeVoter())}}>Clear</Button></Label>
    )

    return (
        <VoterWrapper>
            <Label>Welcome, who's Voting?</Label>
            <Input value={name} onChange={(e) => {setName(e.target.value)}}/>
            <Button onClick={() => {
                const uuid = uuidv4();

                dispatch(addVoter({name, uuid}));
            }}>Set Voter</Button>
        </VoterWrapper>
    );
};

export default Voter;


