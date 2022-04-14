import React from "react";
import { Button, Grid, Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../redux/modules/user';

const Header = (props) => {
  
  const dispatch = useDispatch();
    const is_token = sessionStorage.getItem("token") ? true : false;
    console.log("is_token",is_token)
    const logout =()=>{
        dispatch(actionCreators.logOut({}))
    }
    // if (window.location.pathname === "/signup") return null;
    // if (window.location.pathname === "/login") return null;
    

    if(is_token){
      return (
        <React.Fragment>
          
            
              <Logo src= "https://ifh.cc/g/MNQaDY.png" />
            
            
              <Btn onClick={logout} >logout</Btn>
              
          
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
          
        <Logo src= "https://ifh.cc/g/MNQaDY.png" />

        <BtnBox>
          <Btn onClick={(event) => { history.push("/login"); event.stopPropagation(); }} >login</Btn>
          <Btn onClick={() => {
            history.push("/signup");
          }}>signup</Btn>
        </BtnBox>
        
    </React.Fragment>
  ); 
  
};

const Logo = styled.img`
  height: 25%;
  width: 25%;
  margin: auto;
  margin-top: 80px;
  display: block;
`;

const Btn = styled.button`
  height: 50px;
  width:100px;
  background-color: #71dcce;
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

const BtnBox = styled.div`
  height: 35%;
  width: 35%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: row-reverse;
`;

export default Header;