import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//import { setCookie, deleteCookie } from "../shared/Cookie";

import { actionCreators as userActions } from '../redux/modules/user';



const Login = (props) => {

   const history = useHistory();
   const dispatch = useDispatch();

    const [userId, setuserId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleIdInput = (e) => {
      setuserId(e.target.value)
  }

  const handlePasswordInput = (e) => {
      setPassword(e.target.value)
  }

  const handleLogin = () => {
      if (userId === "" || password === "") {
          window.alert("아이디 혹은 비밀번호가 공란입니다.")
          return;
      }
      
      dispatch(userActions.loginDB(userId, password));
      
  }



    return (
      <React.Fragment>
        <Grid padding="16px">
          <Text size="32px" bold>
            로그인
          </Text>
  
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              type="text"
              placeholder="아이디를 입력해주세요."
              
              _onChange={ handleIdInput }
              
            />                                                                                                                                                             
          </Grid>
  
          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              type="password"
              placeholder="패스워드를 입력해주세요."
              _onChange={handlePasswordInput}
              
            />
          </Grid>
  
          <Button
            text="로그인하기"
            type="submit"
            _onClick={handleLogin}
            
          ></Button>
        </Grid>
      </React.Fragment>
    );
  };
  



export default Login;