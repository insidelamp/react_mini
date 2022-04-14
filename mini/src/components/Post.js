import React from "react";

import { Grid, Image, Text, Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Post = (props) => {
  console.log(props);
  const post_list = useSelector((state) => state.post.post);
  console.log(post_list);

  return (
    <React.Fragment>
      <Grid margin="30px">
        <Text>작성날짜 : {props.createAt}</Text>
        <Text>내용 : {props.contents}</Text>
        <Image shape="rectangle" src={props.imgUrl} />
      </Grid>
      <Button
        width="auto"
        margin="0px 4px 0px 30px"
        padding="4px"
        _onClick={(event) => {
          history.push(`/detail/${props.id}`);
          event.stopPropagation();
        }}
      >
        상세보기
      </Button>
    </React.Fragment>
  );
};

export default Post;
