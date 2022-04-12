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
    console.log(dispatch);
    await api
      .get("api/posts")
      .then((res) => {
        dispatch(loadPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostDB = (post, imageForm) => {
  console.log(post, imageForm);
  return async function (dispatch, getState, { history }) {
    // const user_info = getState().user.user;

    // const _image = getState().preview;

    // const storageRef = ref(
    //   storage,
    //   `images/${user_info.user_id}_${new Date().getTime()}`
    // );

    // const _upload = storage
    //   .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
    //   .putString(_image, "data_url");

    await api
      .post("/api/posts/write", imageForm)
      .then(function (res) {
        console.log("upload response !!", res);
        api
          .post(
            "/api/posts/write",
            {
              userId: post.userId,
              content: post.content,
              imgUrl: post.imgUrl,
            }
            // {
            //   headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},
            // }
          )

          .then((res2) => {
            const postObj = {
              userId: res2.data.userID,
              username: res2.data.username,
              password: "",
              content: post.content,
              modifiedAt: "",
              imgUrl: res2.data.imageUrl,
              userIcon: "",
              comment: "",
              date: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            dispatch(addPost(postObj));
            history.replace("/");
          });
      })

      .catch((err) => {
        console.log("글 불러오기 실패!", err);
      });
  };
};

const editPostDB = (post_id, post) => {
  return async function (dispatch, getState, { history }) {
    await api
      .put("/api/posts/modify/{postsId}", {
        ...post,
      })
      .then((response) => {
        dispatch(editPost(post_id, { ...post }));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("수정 실패");
        // console.log("수정실패");
      });

    // _upload.then((snapshot) => {
    //   snapshot.ref
    //     .getDownloadURL()
    //     .then((url) => {
    //       console.log(url);

    //       return url;
    //     })
    //     .then((url) => {
    //       postDB
    //         .doc(post_id)
    //         .update({ ...post, image_url: url })
    //         .then((doc) => {
    //           dispatch(editPost(post_id, { ...post, image_url: url }));
    //           history.replace("/");
    //         });
    //     })
    //     .catch((err) => {
    //       window.alert("앗! 이미지 업로드에 문제가 있어요!");
    //       console.log("앗! 이미지 업로드에 문제가 있어요!", err);
    //     });
    // });
  };
};

const deletePostDB = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    await api
      .delete("/api/delete/{postId}", { post_id })
      .then((doc) => {
        history.replace("/");
        dispatch(deletePost(post_id));
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
        draft.post.push(...action.payload.postObject);
        console.log(draft);
        draft.is_loading = false;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.post.unshift(action.payload.post);
        console.log(state, draft);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post.findIndex(
          (p) => p.id + "" === action.payload.post_id
        );
        console.log(JSON.stringify(draft.post), idx);

        draft.post[idx] = { ...draft.post[idx], ...action.payload.post };
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.post = draft.post.filter(
          (a) => a.id + "" !== action.payload.post_id
        );
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
