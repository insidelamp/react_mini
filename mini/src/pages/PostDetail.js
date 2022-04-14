import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text, Image } from "../elements";
import axios from "axios";
import Post from "../components/Post";
import api from "../api/api";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const PostDetail = (props) => {
  const post_id = props.match.params.id;
  const post_list = useSelector((state) => state.post.post);
  console.log(post_list);

  const [post, setPost] = React.useState({
    userId: "",
    username: "",
    password: "",
    contents: "",
    modifiedAt: "",
    imgUrl: "",
    userIcon: "",
    comment: "",
    date: "",
  });

  useEffect(() => {
    setPost(
      api
        .get(`/api/posts/${post_id}`)
        .then((response) => {
          setPost({
            imgUrl: response.data.imgUrl,
            contents: response.data.contents,
          });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);
  return (
    <React.Fragment>
       <Box>
      <Grid>
        <Grid padding="16px">
          
        </Grid>
      </Grid>

      <Grid>
       
        <Grid padding="16px">
          {/* <Text margin="0px" size="24px" bold>
            미리보기
          </Text> */}
        </Grid>
      </Grid>
      
      <Image shape="rectangle" src={post.imgUrl} />
      <Text>{post.contents}</Text>
      <Grid padding="16px">
        <Btn
          
          onClick={(event) => {
            history.push(`/modify/${post_id}`);
          }}
        >게시글 수정 및 삭제 하러 가기</Btn>
        
      </Grid>
      </Box>
    </React.Fragment>
  );
};

const Box = styled.div`
  //height: auto;
  width: 70%;
  margin: auto auto 500px; auto;
  margin-top: 200px;
  display: block;
  background-color:#d8e8e8;
  border: 1px solid mome;
  border-radius: 30px;
  box-shadow: 20px 5px 30px #d7dbd9;
`;

const Btn = styled.button`
  height: 50px;
  width:95%;
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

export default PostDetail;
