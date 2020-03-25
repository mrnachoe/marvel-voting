import React, {useEffect} from 'react';
import styled from "styled-components";
import Vote from "./Vote";
import VoteSessions from "./VoteSessions";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {cookieName} from "../../constants/cookies";
import {makeSession} from "../../actions/session";
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import {useCookies} from 'react-cookie';


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

const CreateSession = styled.button`

`;

const App = () => {
  const [cookies, setCookie] = useCookies([cookieName]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies[cookieName]) {
      setCookie(cookieName, uuidv4());
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
          <Switch>
          <Route path="/vote/:id" render={() =>{
            return <>
              <AppBody>
                <Vote/>
              </AppBody>
            </>
          }}/>
          <Route path="/" render={() => {
            return <>
              <AppBody>
                <VoteSessions/>
              </AppBody>
              <AppSideBar>
                <CreateSession onClick={() => {
                  dispatch(makeSession());
                }}>
                  Create New Session</CreateSession>
              </AppSideBar>
            </>
          }}/>
          </Switch>
        </AppContents>
        <Footer>

        </Footer>
      </AppWrapper>
    </Router>
  )
};

export default App;