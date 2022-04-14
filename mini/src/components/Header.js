import React from "react";
import { Button, Grid, Text, Image } from "../elements";
import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../redux/modules/user';

const Header = (props) => {
  
  const dispatch = useDispatch();
    const is_token = sessionStorage.getItem("token") ? true : false;
    console.log("is_token",is_token)
    const logout =()=>{
        dispatch(actionCreators.logOut({}))
    }
    if (window.location.pathname === "/signup") return null;
    if (window.location.pathname === "/login") return null;
    

    if(is_token){
      return (
        <React.Fragment>
          <Grid is_flex padding="4px 16px">
            <Grid>
              {/* <Text margin="0px" size="24px" bold>
                혼자같이
              </Text> */}
              <Image src= "https://ifh.cc/g/MNQaDY.png" />
            </Grid>
            <Grid is_flex>
            
              <Button text="로그아웃" _onClick={logout} ></Button>
              
            </Grid>
          </Grid>
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          {/* <Text margin="0px" size="24px" bold>
            혼자같이
          </Text> */}
          <Image src= "https://ifh.cc/g/MNQaDY.png" />
        </Grid>
        <Grid is_flex>
        
          <Button text="로그인" _onClick={(event) => { history.push("/login"); event.stopPropagation(); }} ></Button>
          <Button text="회원가입" _onClick={() => {
            history.push("/signup");
          }}></Button>
          
        </Grid>
      </Grid>
    </React.Fragment>
  ); 
  
};

export default Header;