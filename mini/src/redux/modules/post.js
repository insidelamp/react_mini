import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import "moment";
import moment from "moment";
import api from "../../api/api";

//로드
const LOAD = "post/LOAD";

const LOG_ON = "post/LOG_ON";

const ADD = "post/ADD";

const EDIT = "post/EDIT";

const DELETE = "post/DELETE";

const LOADING = "LOADING";

//액션 크리에이터

const loadPost = createAction(LOAD, (postObject) => ({ postObject }));

const logOnePost = createAction(LOG_ON, (logOnPost) => ({ logOnPost }));

const addPost = createAction(ADD, (post) => ({ post }));

const editPost = createAction(EDIT, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE, (post_id) => ({ post_id }));

const initialState = {
  post: [],
  logOnPost: {
    user: {
      userID: "",
      password: "",
    },
    imageUrl: "",
  },
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};
// middlewares

const loadPostDB = () => {
  return async function (dispatch, getState, { history }) {
    await api
      .get("api/posts")
      .then((res) => {
        console.log(12345);

        dispatch(loadPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostDB = (post) => {
  return async function (dispatch, getState, { history }) {
    const form = new FormData();
    form.append("file", post.image);
    form.append(
      "postsRequestDto",
      new Blob([JSON.stringify({ contents: post.contents })], {
        type: "application/json",
      })
    );

    console.log("글 추가 시도");
    await api
      .post("/api/posts/write", form, {
        headers: {
          Accept: "*/*",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then(function (res) {
        dispatch(loadPostDB());
        history.replace("/");
        console.log("글 추가 성공!!", res);
      })
      .catch((err) => {
        console.log("글 추가 실패!", err);
      });
  };
};

const editPostDB = (post_id, post) => {
  return async function (dispatch, getState, { history }) {
    const form = new FormData();
    form.append("file", post.image);
    form.append(
      "postsRequestDto",
      new Blob([JSON.stringify({ contents: post.contents })], {
        type: "application/json",
      })
    );

    await api
      .put(`/api/posts/modify/${post_id}`, form, {
        headers: {
          Accept: "*/*",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        dispatch(editPost(post_id, { ...form }));
        dispatch(loadPostDB());
        history.replace("/");
      })
      .catch((err) => {
        window.alert("수정 실패");
      });
  };
};

const deletePostDB = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    await api
      .delete(`/api/posts/delete/${post_id}`, { post_id })
      .then((doc) => {
        dispatch(deletePost(post_id));
        dispatch(loadPostDB());
        history.replace("/");
      })
      .catch((error) => {
        window.alert("아 게시물 삭제에 문제가 있어요");
        console.log("앗! 게시물 삭제에 문제가있어요!", error);
      });
  };
};
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        console.log(1234455555);
        draft.post = action.payload.postObject;
        draft.is_loading = false;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post.findIndex((p) => {
          return p.id + "" === action.payload.post_id;
        }); //p.id + "" === action.payload.post_id

        draft.post[idx] = { ...draft.post[idx], ...action.payload.post };
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.post = draft.post.filter((a) => a.id !== action.payload.post_id);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  loadPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };
