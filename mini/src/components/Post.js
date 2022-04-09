import React from "react";

import { Grid, Image, Text, Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

const Post = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  return (
    <React.Fragment>
      <Grid margin="30px">
        <Text>{props.userId}</Text>
        <Text>{props.content}</Text>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "yarn",
    user_profile:
      "https://insidelamp.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20220314_085335507.jpg",
  },
  image_url:
    "https://insidelamp.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20220314_085335507.jpg",
  contents: "풍경",
  comment_cnt: 10,
  insert_dt: "2022-04-01 10:00:00",
  is_me: false,
};

export default Post;
