import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api"


//actions
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

//action creators
const login = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({ user }));

//initialState ***
const initialState = {
    userId: null,
    is_login: false,
    name: null,
    
}

//middleware actions
const loginDB = (userId, password) => {
    return async function (dispatch, getState,{history}) {
        const data = {
            userId: userId,
            password: password,
        }
        console.log(data);
        // dispatch(login(data.userId));
        await api.post("/login",  data)
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('name', response.data.userId);
                    
                    history.push('/')
                    window.location.replace("/")
                    
                    console.log("로그인이 되었어요")
                }
                dispatch(login(response.data.userId))
            })
            .catch((err) => {
               console.log(err);
            //    window.alert("아이디와 비밀번호가 일치하지 않습니다.")
        })
    }
}

const signup = (userId, username, password, gender) => {
    return async function (dispatch, getState, { history }) {
      
      const userInfo = {
        userId: userId,
        username: username,
        password: password,
        gender: gender,
      };
      console.log("회원가입중2")
      await api
        .post("/signup", userInfo)
        .then(function (response) {
            console.log(response)
          history.push("/login");
        })
        .catch((err) => {
          window.alert("회원가입에 실패했어요😥");
        });
    };
  };

//reducer
export default handleActions({
    [LOGIN]: (state, action) => produce(state, (draft) => {
        console.log(state, action);
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log("action.payload.user",action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
    produce(state, (draft) => {
        localStorage.removeItem("name")
        localStorage.removeItem("token")
        window.location.replace("/")
        console.log("로그아웃합니다")
    }),
    },
    initialState
);

//action creator export
const actionCreators = {
    login,
    loginDB,
    getUser,
    signup,
    logOut
};

export { actionCreators }