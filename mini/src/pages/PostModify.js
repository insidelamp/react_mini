import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import axios from "axios";
import Post from "../components/Post";
import api from "../api/api";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";

const PostWrite = (props) => {
  const post_id = props.match.params.id;
  const dispatch = useDispatch();
  const fileInput = useRef();
  const post_list = useSelector((state) => state.post.post);

  const preview = useSelector((state) => state.image.preview);

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
    setPost(
      api
        .get(`/api/posts/` + post_id)
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

  const editPost = () => {
    let image = fileInput.current.files[0];
    dispatch(
      postActions.editPostDB(post_id, {
        contents: post.contents,
        image: image,
      })
    );
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
      <Grid padding="16px">
        <Text margin="0px 0px 10px 10px">jpg, jpeg, png, gif 업로드 가능</Text>
        <Upload preview={preview} _ref={fileInput} />
        {/* <Image shape="rectangle" src={preview ? preview : "https://wpi.digication.com/srvs/filemanager/campus/jDt5abnGTNWMW3zpvKz5/resize=fit:crop,align:center,width:1182,height:667/compress/cache?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJqRHQ1YWJuR1ROV01XM3pwdkt6NSIsImV4cCI6OTk5OTk5OTk5OX0.UJ6s9UfmkeztKB_VajDR7LD1aOvLSrtPLz-gfi5I2_M"}></Image> */}
      </Grid>
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
