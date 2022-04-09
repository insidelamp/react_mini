import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import "moment";
import moment from "moment";

//로드
const LOAD = "post/LOAD";

const CREATE = "post/CREATE";

const UPDATE = "post/UPDATE";

const DELETE = "post/DELETE";

//액션 크리에이터

const loadPost = createAction(LOAD, (postObject) => ({ postObject }));

const addPost = createAction(CREATE, (post) => ({ post }));

const editPost = (paylod) => {
  return { type: UPDATE, paylod };
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

const addPostFB = (content) => {
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
      nickname: "",
      imgUrl: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
      userIcon: "",
      comment_cnt: 0,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      content: "",
    };
    console.log(postObj);
    // axios
    //   .post("http://localhost:3001/posts", { ...postObj })
    //   .then((res) => {
    //     dispatch(addPost({ ...initialPost, postId: res.data.postId }));
    //     // history.replace("/");
    //   })
    //   .catch((err) => {
    //     window.alert("해당 글을 불러올 수 없습니다!");
    //     console.log("글 불러오기 실패!", err);
    //   });
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.post.push(...action.payload.postObject);
        console.log(draft);
      }),
    [CREATE]: (state, action) =>
      produce(state, (draft) => {
        draft.post.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  loadPostDB,
  addPostFB,
};

export { actionCreators };
