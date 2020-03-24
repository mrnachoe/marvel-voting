import React, {useEffect} from 'react';
import styled from "styled-components";
import Vote from "./Vote";
import Voter from "./Voter";
import VoteSessions from "./VoteSessions";
import {connect, useDispatch} from "react-redux";
import {addVoter} from "../../actions/voter";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const AppWrapper = styled.div`
    background-color: white;
`;

const Header = styled.div`
    display: flex;
    height: 60px;
    padding: 0 20px;
    align-items: center;
    justify-content: space-around;
    background-color: lightgrey;
`;

const AppContents = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 500px;
`;

const AppBody = styled.div`
  flex: 1;
  margin-right: 1em;
`;
const AppSideBar = styled.div`
  flex: .3;
  margin-right: 4rem;
`;

const Footer = styled.div`
    height: 60px;
    background-color: lightgrey;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        cursor: pointer;
    }
`;

const App = ({voter}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!voter.name) {
            const name = localStorage.getItem('voterName');
            const uuid = localStorage.getItem('voterUUID');
            dispatch(addVoter({name, uuid}))
        }
    }, []);

    return (
        <Router>
            <AppWrapper>
                <Header>
                    <StyledLink to={"/"}>
                        <h3>Marvel Voting</h3>
                    </StyledLink>
                </Header>
                <AppContents>
                    <AppBody>
                        <Switch>
                            <Route path="/vote/:id" children={<Vote/>}/>
                            <Route path="/" children={ <VoteSessions/>}/>
                        </Switch>
                    </AppBody>
                    <AppSideBar>
                        <Voter/>
                    </AppSideBar>
                </AppContents>

                <Footer>

                </Footer>
            </AppWrapper>
        </Router>
    )
};

export default connect((state) => {
    return {
        voter: state.voter
    }
}, null)(App);