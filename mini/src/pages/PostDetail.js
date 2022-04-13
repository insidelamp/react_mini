import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text, Image } from "../elements";
import axios from "axios";
import Post from "../components/Post";
import api from "../api/api";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";

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
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {post.userId}님의 게시글 상세보기
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
      <Text>{post.contents}</Text>
      <Image shape="rectangle" src={post.imgUrl} />

      <Grid padding="16px">
        <Button
          text="게시글 수정 및 삭제 하러 가기"
          _onClick={(event) => {
            history.push(`/modify/${post_id}`);
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
