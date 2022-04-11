import React, { useEffect } from "react";
import axios from "axios";
import { __loadPost } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import { Grid, Button, Input, Text } from "../elements";
import Post from "../components/Post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => post);

  console.log(post.post);

  const [content, setContent] = React.useState(post ? post.content : "");

  useEffect(() => {
    dispatch(postActions.loadPostDB());
  }, []);
  const changeContents = (e) => {
    setContent(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostDB({ content: content }));
  };

  return (
    <React.Fragment>
      <Grid margin="10px">
        {post.post.map((p, idx) => {
          return (
            <Grid>
              <Post {...p} />
            </Grid>
          );
        })}
      </Grid>

      <Grid padding="16px">
        <Input
          value={content}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiline
        />
      </Grid>

      <Button text="게시글 작성" _onClick={addPost} />
    </React.Fragment>
  );
};

export default PostList;
