import React from "react";
import { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {

  const dispatch=useDispatch()
  const [values, setValues] = useState({
    userId: "",
    username: "" ,
    password: "",
    gender : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  // const specialLetter = values.userId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  const handleId = (e) => {
    setValues({ ...values, userId: e.target.value });
  };
  const handleName = (e) => {
      setValues({ ...values, username: e.target.value });
    };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handleGender = (e) => {
    setValues({ ...values, gender: e.target.value });
  };
  
  // const handleSpecialLetter = (e) => {
  //   setValues({...values, specialLetter: e.target.value});
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(
      values.userId && 
      values.username &&
      values.password &&
       values.gender 
       ){
      setValid(true);
    } 

    if(values.userId ==='' || 
    values.username === '' ||
        values.password === '' || 
        values.gender === '' 
        ){
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!😅");
      return;
    }

    // if(values.password !== values.passwordConfirm){
    // window.alert("앗! 비밀먼호가 일치하지 않아요! 😅");
    // return;
    // }

    // if (values.userId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) !== -1) {
    //   window.alert("ID에 특수 문자는 안돼요!😅");
    //   return;
    // }
    
    setSubmitted(true);
    dispatch(userActions.signup(values.userId, values.password, values.gender, values.username ));
  }




  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <form  onSubmit={handleSubmit}>

        <Grid padding="16px 0px">
          <Input
            label="아이디" 
            placeholder="아이디를 입력해주세요."
            _onChange={handleId}
            value={values.userId}
            name="loginId"
          />
          <Button>아이디 중복확인</Button>
        </Grid>

        <Grid padding="16px 0px">
          <Input

            _onChange={handleName}
            value={values.username}
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            name="username"
          />
          <Button>닉네임 중복확인</Button>
        </Grid>


        <Grid padding="16px 0px">
          <Input
            value={values.password}
            type="Password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={handlePassword}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={() => {
              console.log("!!");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            _onChange={handleGender}
            value={values.gender}
            label="성별"
            placeholder="여자 혹은 남자로 입력해주세요."
            name="gender"
          />
        </Grid>

        <Button text="회원가입하기" type="submit" onClick={() => {}}></Button>
      </form>
      </Grid>
      
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;