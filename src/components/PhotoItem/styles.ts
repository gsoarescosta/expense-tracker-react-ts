import styled from "styled-components";

export const Container = styled.div`
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 10px;
  color: black;
  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  button {
    display: block;
    background-color: lightblue;
    border: 0;
    color: black;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    margin: 10px auto 0 auto;
    cursor: pointer;
    &:hover {
      background-color: blue;
      color: white;
    }
  }
`;
