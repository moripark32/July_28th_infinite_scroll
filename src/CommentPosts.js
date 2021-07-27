import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then(({ data }) => setComments(data));
  }, []);

  return (
    <Container>
      <GlobalStyle />
      {comments.map((post, index) => (
        <Comment key={index}>
          <Id>{post.id}</Id>
          <Email>{post.email}</Email>
          <Body>{post.body}</Body>
        </Comment>
      ))}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color:yellow;
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
`;
const Comment = styled.div`
  border: 1px solid black;
  margin: 30px;
`;
const Id = styled.div`
  border: 1px solid red;
`;
const Email = styled.div`
  border: 1px solid blue;
`;
const Body = styled.div`
  border: 1px solid green;
`;
