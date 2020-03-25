import React, {useEffect} from 'react';
import Vote from "./Vote";
import VoteSessions from "./VoteSessions";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {cookieName} from "../../constants/cookies";
import {makeSession} from "../../actions/session";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useCookies} from 'react-cookie';
import { AppWrapper, Header, AppContents, AppBody, AppSideBar, Footer, StyledLink, CreateSession } from './style'

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