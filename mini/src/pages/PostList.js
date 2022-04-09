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
  console.log(props);
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => post);
  console.log(post);
  const history = useHistory();

  const [userid, setUserId] = React.useState("");
  const [contents, setContents] = React.useState("");

  useEffect(() => {
    if (post.post.length === 0) {
      dispatch(postActions.loadPostDB());
    }
  }, []);

  const addPost = () => {
    dispatch(postActions.addPostFB({ userId: userid, content: contents }));
  };

  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(setContents(e.target.value));
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
          value={contents}
          label="게시글 내용"
          placeholder="게시글 작성"
          _onChage={changeContents}
        />
        <Input
          value={userid}
          label="게시글 내용"
          placeholder="게시글 작성"
          _onChage={changeContents}
        />
      </Grid>

      <Button text="게시글 수정" _onClick={addPost} />
    </React.Fragment>
  );
};

export default PostList;
