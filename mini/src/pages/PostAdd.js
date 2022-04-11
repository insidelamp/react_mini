import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import { history } from "../redux/configureStore";

const PostWrite = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const [content, setContent] = React.useState("");
  const changeContents = (e) => {
    setContent(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostDB({ content: content }), history.replace("/"));
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            게시글 작성
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

      <Grid padding="16px">
        <Input
          value={content}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 작성" _onClick={addPost}></Button>)
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
