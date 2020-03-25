import styled from "styled-components";
import { BrowserRouter as Link } from "react-router-dom";

export const AppWrapper = styled.div`
    background-color: white;
`;

export const Header = styled.div`
    display: flex;
    height: 60px;
    padding: 0 20px;
    align-items: center;
    justify-content: space-around;
    background-color: lightgrey;
`;

export const AppContents = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 500px;
`;

export const AppBody = styled.div`
  flex: 1;
  margin-right: 1em;
`;
export const AppSideBar = styled.div`
  flex: .3;
  margin-right: 4rem;
`;

export const Footer = styled.div`
    height: 60px;
    background-color: lightgrey;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        cursor: pointer;
    }
`;

/**
 * Comment
 * Empty styled-component that was submitted
 */
export const CreateSession = styled.button`

`;