import React from "react";

import { Grid, Image, Text, Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid margin="30px">
        <Text>{props.id}</Text>
        <Text>{props.userId}</Text>
        <Text>{props.content}</Text>
      </Grid>
      <Button
        width="auto"
        margin="0px 4px 0px 30px"
        padding="4px"
        _onClick={(event) => {
          history.push(`/modify/${props.id}`);
          event.stopPropagation();
        }}
      >
        수정
      </Button>
      <Grid is_flex margin="0px 10px" width="auto">
        <Button width="auto" padding="4px">
          삭제
        </Button>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "yarn",
    user_profile: "",
  },
  image_url: "",
  content: "",
  comment_cnt: "",
  insert_dt: "2022-04-01 10:00:00",
  is_me: false,
};

export default Post;
