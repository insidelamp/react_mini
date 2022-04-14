import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import Upload from "../shared/Upload";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const PostAdd = (props) => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [contents, setContents] = React.useState("");

  const cookies = new Cookies();

  const is_login = cookies.get("is_login");
  const userName = cookies.get("userName");

  const preview = useSelector((state) => state.image.preview);
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPostBtn = () => {
    let image = fileInput.current.files[0];
    console.log(image);

    dispatch(postActions.addPostDB({ contents: contents, image: image }));
  };
  if (!is_login && !userName) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  } else {
    return (
      <React.Fragment>
        <Grid padding="16px">
          <Text margin="0px 0px 10px 10px">
            jpg, jpeg, png, gif 업로드 가능
          </Text>
          <Upload preview={preview} _ref={fileInput} />
        </Grid>
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
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
        </Grid>

        <Grid padding="16px">
          <Button text="게시글 작성" _onClick={addPostBtn}></Button>)
        </Grid>
      </React.Fragment>
    );
  }
};

export default PostAdd;
