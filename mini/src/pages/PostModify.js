import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import axios from "axios";
import Post from "../components/Post";

const PostWrite = (props) => {
  console.log(props);
  const post_id = props.match.params.id;
  const dispatch = useDispatch();

  const [post, setPost] = React.useState({
    userId: "",
    username: "",
    password: "",
    content: "",
    modifiedAt: "",
    imgUrl: "",
    userIcon: "",
    comment: "",
    date: "",
  });
  const changeContents = (e) => {
    setPost({
      ...post,
      content: e.target.value,
    });
  };

  useEffect(() => {
    console.log(post_id);
    const result = {
      userId: "",
      username: "",
      password: "",
      content: "",
      modifiedAt: "",
      imgUrl: "",
      userIcon: "",
      comment: "",
      date: "",
    };
    setPost(
      axios
        .get("http://localhost:3001/posts" + post_id)
        .then((response) => {
          console.log(1234, response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {post.content}님 게시글 수정
          </Text>
        </Grid>
      </Grid>
      {post.title}
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
      </Grid>

      <Grid padding="16px">
        <Input
          value={post.content}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>
      <Post {...post} />

      <Grid padding="16px">
        {/* <Button text="게시글 수정" _onClick={addPost}></Button>) */}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
