import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import "moment";
import moment from "moment";

//로드
const LOAD = "post/LOAD";

const ADD = "post/ADD";

const EDIT = "post/EDIT";

const DELETE = "post/DELETE";

//액션 크리에이터

const loadPost = createAction(LOAD, (postObject) => ({ postObject }));

const addPost = createAction(ADD, (post) => ({ post }));

const editPost = (post, id) => {
  return { type: EDIT, post, id };
};

const deletePost = (paylod) => {
  return { type: DELETE, paylod };
};

const initialState = {
  post: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};
// middlewares

const loadPostDB = () => {
  return function (dispatch, getState, { history }) {
    console.log(dispatch);
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        dispatch(loadPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostDB = (post) => {
  return function (dispatch, getState, { history }) {
    // const user_info = getState().user.user;

    // const _image = getState().preview;

    // const storageRef = ref(
    //   storage,
    //   `images/${user_info.user_id}_${new Date().getTime()}`
    // );

    // const _upload = storage
    //   .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
    //   .putString(_image, "data_url");
    const postObj = {
      userId: "",
      username: "",
      password: "",
      content: post.content,
      modifiedAt: "",
      imgUrl: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
      userIcon: "",
      comment: "",
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    console.log(postObj);
    axios
      .post("http://localhost:3001/posts", {
        content: post.content,
        imageUrl: post.imageUrl,
        id: post.id,
      })

      .then((res) => {
        console.log(1111, res);
        dispatch(addPost(res));
        // history.replace("/");
      })
      .catch((err) => {
        console.log("글 불러오기 실패!", err);
      });
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.post.push(...action.payload.postObject);
        console.log(draft);
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.post.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  loadPostDB,
  addPostDB,
};

export { actionCreators };
