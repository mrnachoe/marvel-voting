/**
 * Comment
 * Seperating styled components makes your component more digestable
 */
import styled from "styled-components";

export const CardWrapper = styled.div`
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

export const VoteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
`;

export const VoteLabel = styled.div`
    flex: 1;
    padding-bottom: 5px;
`;

export const VoteCount = styled.div`
    flex: 1;
    padding-bottom: 5px;
`;

export const Button = styled.button`
    flex: 1;
    padding-bottom: 5px;
`;