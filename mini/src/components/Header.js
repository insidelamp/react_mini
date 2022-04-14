import React from "react";
import { Button, Grid, Text, Image } from "../elements";
import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/user";
import Cookies from "universal-cookie";

const Header = (props) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const isLogin = cookies.get("isLogin");
  const userName = cookies.get("userName");

  // const logout = () => {
  //   dispatch(actionCreators.logoutDB());

  if (window.location.pathname === "/signup") return null;
  if (window.location.pathname === "/login") return null;

  if (isLogin && userName) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            {/* <Text margin="0px" size="24px" bold>
                혼자같이
              </Text> */}
            <Image src="https://ifh.cc/g/MNQaDY.png" />
          </Grid>
          <Grid is_flex>
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(actionCreators.logoutDB());
                history.replace("/");
                window.location.reload();
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            {/* <Text margin="0px" size="24px" bold>
            혼자같이
          </Text> */}
            <Image src="https://ifh.cc/g/MNQaDY.png" />
          </Grid>
          <Grid is_flex>
            <Button
              text="로그인"
              _onClick={(event) => {
                history.push("/login");
                event.stopPropagation();
              }}
            ></Button>
            <Button
              text="회원가입"
              _onClick={() => {
                history.push("/signup");
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default Header;
