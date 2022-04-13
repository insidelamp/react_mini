import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid, Button, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import Upload from "../shared/Upload";

const PostAdd = (props) => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [contents, setContents] = React.useState("");
  const preview = useSelector((state) => state.image.preview);
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPostBtn = () => {
    let image = fileInput.current.files[0];
    console.log(image);

    dispatch(postActions.addPostDB({ contents: contents, image: image }));
  };

  //   const postBtn = () => {
  //     // console.log("버튼 클릭!");

  //     const tagResult = tagData.filter((item, i) => item !== '');
  //     if(tagResult.length === 0){window.alert('한개이상의 태그 작성해주세요~'); return;}

  //     const imageForm = new FormData();
  //     let image = fileInput.current.files[0];
  //     imageForm.append('image', image);

  //     // dispatch(imageActions.uploadImageFB(imageForm));

  //     dispatch(postActions.addPostFB(title, tagResult, imageForm));

  // }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px 0px 10px 10px">jpg, jpeg, png, gif 업로드 가능</Text>
        <Upload preview={preview} _ref={fileInput} />
        {/* <Image shape="rectangle" src={preview ? preview : "https://wpi.digication.com/srvs/filemanager/campus/jDt5abnGTNWMW3zpvKz5/resize=fit:crop,align:center,width:1182,height:667/compress/cache?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJqRHQ1YWJuR1ROV01XM3pwdkt6NSIsImV4cCI6OTk5OTk5OTk5OX0.UJ6s9UfmkeztKB_VajDR7LD1aOvLSrtPLz-gfi5I2_M"}></Image> */}
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
};

export default PostAdd;
