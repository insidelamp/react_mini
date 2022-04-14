import React from "react";

import { Grid, Image, Text, Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const Post = (props) => {
  console.log(props);
  const post_list = useSelector((state) => state.post.post);
  console.log(post_list);

  return (
    <React.Fragment>
      <Box>
      <Grid margin="30px">
        <Text>번호 : {props.id}</Text>
        <Text>사용자 이름 : {props.userId}</Text>
        
        <Image  shape="rectangle" src={props.imgUrl} />
        <Text>내용 : {props.contents}</Text>
      </Grid>
      <Btn
        width="auto"
        margin="0px 4px 0px 30px"
        padding="4px"
        onClick={(event) => {
          history.push(`/detail/${props.id}`);
          event.stopPropagation();
        }}
      >
        상세보기
      </Btn>
      </Box>
    </React.Fragment>
    
  );
};

const Box = styled.div`
  //height: auto;
  width: 800px;
  margin: auto;
  margin-top: 150px;
  display: block;
  //background-color:#a6dbdb;
  //border: 1px solid #a6dbdb;
  border-radius: 30px;
  box-shadow: 20px 5px 30px #d7dbd9;
`;

const Btn = styled.button`
  height: 50px;
  width:100px;
  background-color: #ffffff;
  margin: auto;
  border: none;
  border-radius: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  color:#065555;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin: 15px;
`;

export default Post;
