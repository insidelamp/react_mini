import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
//import axios from 'axios'
import api from "../../api/api";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

import { setToken } from "../../shared/token";
import { setCookie, deleteCookie } from "../../shared/Cookie";

const cookies = new Cookies();

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, () => ({}));
const logOut = createAction(LOG_OUT, () => ({}));

// initialState
const initialState = {
  userInfo: {
    userId: "",
    username: "",
  },
  isLogin: false,
};

// const loginCheckDB = () => {
//   const token = sessionStorage.getItem("token");
//   return async function (dispatch, getState, { history }) {
//     await api
//       .post(
//         "/auth",
//         {},
//         {
//           headers: {
//             "content-type": "applicaton/json;charset=UTF-8",
//             accept: "application/json",
//             Authorization: `${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         dispatch(
//           setUser({
//             userId: res.data.userId,
//             username: res.data.username,
//           })
//         );
//       })
//       .catch((err) => {
//         console.log("로그인 확인 실패", err);
//       });
//   };
// };

const loginDB = (userId, password) => {
  return function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    api
      .post(
        "/api/user/login",
        {
          userId: userId,
          password: password,
        }
        // {
        //   headers: {
        //     "content-type": "applicaton/json;charset=UTF-8",
        //     accept: "application/json",
        //     Authorization: `${token}`,
        //   },
        // }
      )
      // .then((res) => {
      //   console.log(res);
      //   const token_res = res.data.token;
      //   setToken(token_res);
      //   return res.data;
      // })
      // .then((token_res) =>{
      //   api({
      //     method: "get",
      //     url: "/auth",
      //     headers: {
      //       "Authorization": `Bearer ${token_res}`,
      //     },
      //   })
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            userId: res.data.userId,
            username: res.data.username,
          })
        );
        const accessToken = res.data.token;
        console.log(accessToken);
        // cookies.set("myJWT", accessToken, { path: "/" });
        const { username } = jwt_decode(accessToken);
        console.log(username);
        // cookies.set("userId", USER_ID, { path: "/" });
        cookies.set("userName", username, { path: "/" });

        cookies.set("isLogin", username, `${accessToken}`);

        window.alert("로그인 완료");
        history.replace("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    // .catch((err) => {
    //   console.log("로그인 확인 실패", err)
    // })
    // history.replace('/')
    //})
    // .catch((err) => {
    //   window.alert("이메일이나 패스워드를 다시 확인해주세요!")
    // })
  };
};

const signUpDB = (userId, password, username, gender) => {
  return async function (dispatch, getState, { history }) {
    await api

      .post("/api/user/signup", {
        userId: userId,
        username: username,
        password: password,
        gender: gender,
      })
      .then((res) => {
        console.log(res);
        window.alert("회원가입이 완료되었습니다!");
        history.replace("/");
      })
      .catch((err) => {
        window.alert("이미 존재하는 아이디입니다!");
      });
    // .catch((err) => {
    //   window.alert(err.response.data.errorMessage);
    // })
  };
};

const logoutDB = () => {
  return function (dispatch, getState) {
    cookies.remove("isLogin");
    cookies.remove("userName");
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("isLogin", "success");

        draft.userInfo = action.payload.user;
        console.log(1111, draft, draft.userInfo);
        draft.isLogin = true;
        console.log(draft.isLogin);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("isLogin");
        deleteCookie("userName");
        draft.userInfo = {
          userId: "",
          username: "",
        };
        draft.isLogin = false;
      }),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  logoutDB,
  getUser,
  signUpDB,
  loginDB,
  // loginCheckDB,
};

export { actionCreators };
