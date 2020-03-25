/**
 * Comment
 * Seperating styled components makes your component more digestable
 */
import styled from "styled-components";
import {Link} from "react-router-dom";

export const CardWrapper = styled.div`
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

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardLabel = styled.div`
  font-weight: 500;
`;

export const CardLink = styled(Link)`
  display: flex;
  text-decoration: none;
  cursor: pointer;

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      cursor: pointer;
  }
`;