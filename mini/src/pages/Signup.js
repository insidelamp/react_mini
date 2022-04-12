import React, { useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import UserInput from "../components/UserInput";
//import axios from 'axios';

import { Text, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { idCheck, usernameCheck } from "../shared/common";

const Signup = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [gender, setGender] = useState("");

  const signup = () => {
    if (
      userId === "" ||
      password === "" ||
      username === "" ||
      pwd_check === "" ||
      gender === ""
    ) {
      window.alert("모두 입력해주세요!");
      return;
    }

    if (!idCheck(userId)) {
      window.alert("아이디 형식이 맞지 않습니다!");
      return;
    }

    if (!usernameCheck(username)) {
      window.alert("닉네임에는 기호가 없어야 합니다!");
      return;
    }

    if (password !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }

    dispatch(userActions.signUpDB(userId, password, username, gender));
  };

  return (
    <SignupWrap>
      <Text margin="0px 0px 48px 0px" size="48px" bold>
        회원가입
      </Text>
      <ContentWrap>
        <Text margin="0px 0px 8px 0px">아이디</Text>
        <UserInput
          _onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요!"
          margin="0px 0px 24px 0px"
          value={userId}
        />
        <button>중복확인</button>
        <Text margin="0px 0px 8px 0px">닉네임</Text>
        <UserInput
          _onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요!"
          margin="0px 0px 24px 0px"
          value={username}
        />
        <button>중복확인</button>

        <Text margin="0px 0px 8px 0px">패스워드</Text>
        <UserInput
          _onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="패스워드를 입력해주세요!"
          margin="0px 0px 24px 0px"
          value={password}
          type="password"
        />

        <Text margin="0px 0px 8px 0px">패스워드 확인</Text>
        <UserInput
          _onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
          placeholder="패스워드를 똑같이 입력해주세요!"
          margin="0px 0px 24px 0px"
          value={pwd_check}
          type="password"
        />

        <Text margin="0px 0px 8px 0px">성별</Text>
        <UserInput
          _onChange={(e) => {
            setGender(e.target.value);
          }}
          placeholder="여자 혹은 남자로 입력해주세요!"
          margin="0px 0px 24px 0px"
          value={gender}
        />
      </ContentWrap>
      <ButtonWrap>
        <Button width="48%" _onClick={signup}>
          회원가입
        </Button>
        <Button
          width="48%"
          _onClick={() => {
            history.push("/");
          }}
        >
          취소
        </Button>
      </ButtonWrap>
    </SignupWrap>
  );
};

const SignupWrap = styled.div`
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

export default Signup;
