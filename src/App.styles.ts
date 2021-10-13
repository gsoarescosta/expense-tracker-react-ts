import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  background-color: darkblue;
  height: 150px;
  text-align: center;
`;

export const HeaderText = styled.h1`
  margin: 0;
  padding: 30px 0 0 0;
  color: #ffffff;
`;

export const Body = styled.div`
  margin: auto;
  max-width: 980px;
  margin-bottom: 50px;
`;

export const PhotoHeaderText = styled.h1`
  margin: 0;
  padding: 20px 0;
  color: #888;
  text-align: center;
`;

export const ScreenWarning = styled.div`
  text-align: center;

  .emoji {
    font-size: 50px;
    margin-bottom: 20px;
  }
`;

export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const UploadForm = styled.form`
  background-color: #f3f3f3;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="submit"] {
    background-color: lightblue;
    border: 0;
    color: black;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    margin: 0 20px;
    cursor: pointer;
    &:hover {
      background-color: blue;
      color: white;
    }
  }
`;
