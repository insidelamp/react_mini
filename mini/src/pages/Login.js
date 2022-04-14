import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import '../App.css'

import UserInput from "../components/UserInput";
import { Text, Button, Grid, Image } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { idCheck } from "../shared/common";
import PostList from "./PostList";

const Login = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (userId === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요!");
      return;
    }

    if (!idCheck(userId)) {
      window.alert("아이디 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.loginDB(userId, password));
  };

  return (
    <LoginWrap>
      

      <Text margin="0px 00px 48px 0px" size="35px" bold>
        로그인
      </Text>
      <ContentWrap>
        <Text margin="0px 0px 8px 0px">아이디</Text>
        <UserInput
          _onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요!"
          margin="0px 0px 36px 0px"
          value={userId}
        />
        <Text margin="0px 0px 8px 0px">패스워드</Text>
        <UserInput
          _onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="패스워드를 입력해주세요!"
          margin="0px 0px 36px 0px"
          value={password}
          type="password"
        />
      </ContentWrap>
      <ButtonWrap>
        <Btn width="48%" onClick={login}>
          로그인
        </Btn>
        <Btn
          width="48%"
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Btn>
      </ButtonWrap>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  width: calc(90% - 400px);
  padding: 80px 40px;
  margin: 0 auto;
  text-align: center;
`;
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 50%;
  width: 50%;
  margin: 100px;
`;

const Btn = styled.button`
height: 50px;
width:95%;
background-color: #9fcfcf;
margin: auto;
border: none;
border-radius: 30px;
font-family: "Noto Sans KR", sans-serif;
font-size: 1rem;
color:#ffffff;
font-weight: 1000;
text-align: center;
text-decoration: none;
margin: 15px;
`;

export default Login;
