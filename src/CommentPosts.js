import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

function CommentPosts() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`,
      )
      .then(({ data }) => {
        setPage(prev => {
          return prev + 1;
        });
        setComments(prev => {
          const newArr = [...prev, ...data];
          return newArr;
        });
      });
  };

  return (
    <InfiniteScroll
      dataLength={comments ? comments.length : 1}
      next={getData}
      loader={<></>}
      hasMore={true}
      scrollThreshold="1000px"
    >
      <Container>
        <GlobalStyle />
        {comments.map((post, index) => (
          <Comment key={index}>
            <Id>
              <span>Comment Id</span>
              {post.id}
            </Id>
            <Email>
              <span>Email</span> {post.email}
            </Email>
            <Body>
              <span>Comment</span>
              <p>{post.body}</p>
            </Body>
          </Comment>
        ))}
      </Container>
    </InfiniteScroll>
  );
}

export default CommentPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-size:18px;
    font-family: SFProDisplay;
  }
`;
const Comment = styled.div`
  width: 500px;
  height: 193px;
  background: #f8f9fa;
  border: 0.5px solid #ced4da;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 30px;
`;
const Id = styled.div`
  margin-top: 20px;
  span {
    font-weight: 900;
    margin: 0 12px;
  }
`;
const Email = styled.div`
  margin-top: 12px;
  span {
    font-weight: 900;
    margin: 0 12px;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  span {
    font-weight: 900;
    margin: 0 12px;
  }
  p {
    margin: 0 12px;
  }
`;
