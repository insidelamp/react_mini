import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import api from "../../api/api";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imageURl) => ({ imageURl }));
const setpreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  imageURl:
    "https://wpi.digication.com/srvs/filemanager/campus/jDt5abnGTNWMW3zpvKz5/resize=fit:crop,align:center,width:1182,height:667/compress/cache?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJqRHQ1YWJuR1ROV01XM3pwdkt6NSIsImV4cCI6OTk5OTk5OTk5OX0.UJ6s9UfmkeztKB_VajDR7LD1aOvLSrtPLz-gfi5I2_M",
  uploading: false,
  preview: null,
};

const uploadImageFB = (imageForm) => {
  console.log(uploadImageFB);
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    api
      .post("/api/posts/write", imageForm)
      .then(function (res) {
        console.log("upload response !! ", res);

        dispatch(uploadImage(`http://3.35.27.159:8080/${res.data}`));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.imageURl = action.payload.imageURl;
        draft.uploading = false;
      }),

    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setpreview,
  uploading,
};

export { actionCreators };
