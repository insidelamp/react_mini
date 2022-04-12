import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import axios from "axios";
import Post from "../components/Post";
import api from "../api/api";

const PostWrite = (props) => {
  console.log(props);
  const post_id = props.match.params.id;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.post);
  console.log(post_list);
  const is_edit = post_id ? true : false;
  console.log(is_edit);

  const [contents, setContents] = React.useState(post_list.contents);

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
  const changeContents = (e) => {
    setPost({
      // ...post,
      contents: e.target.value,
    });
  };

  useEffect(() => {
    console.log(post_id);
    const result = {
      userId: "",
      username: "",
      password: "",
      contents: "",
      modifiedAt: "",
      imgUrl: "",
      userIcon: "",
      comment: "",
      date: "",
    };
    setPost(
      api
        .get("/api/posts/modify/{postsId}")
        .then((response) => {
          setPost({
            contents: response.data.contents,
            userId: response.data.userId,
          });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);

  const editPost = () => {
    dispatch(postActions.editPostDB(post_id, post));
  };
  const deletePost = () => {
    dispatch(postActions.deletePostDB(post_id));
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {post.userId}님 게시글 수정
          </Text>
        </Grid>
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
      </Grid>
      <Post {...post} />

      <Grid padding="16px">
        <Input
          value={post.contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 수정" _onClick={editPost}></Button>
        <Button margin="30px" text="게시글 삭제" _onClick={deletePost}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
