import React, { useEffect } from "react";
import axios from "axios";
import { __loadPost } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import { Grid, Button, Input, Text } from "../elements";
import Post from "../components/Post";
import { history } from "../redux/configureStore";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => post.post);
  console.log(post);

  useEffect(() => {
    if (post.length === 0) {
      dispatch(postActions.loadPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid margin="10px">
        {post.map((p, idx) => {
          return (
            <Grid>
              <Post {...p} />
            </Grid>
          );
        })}
      </Grid>
      <Button
        text="게시글 추가하러가기"
        _onClick={(event) => {
          history.push(`/add`);
          event.stopPropagation();
        }}
      ></Button>
    </React.Fragment>
  );
};

export default PostList;
