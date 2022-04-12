import React from "react";
import { Button, Grid, Text, Image } from "../elements";
import { useHistory } from 'react-router-dom';

const Header = ( ) => {
  const history = useHistory();

  // const Login = () => {
  //   document.location.href("/")
  // }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          {/* <Text margin="0px" size="24px" bold>
            혼자같이
          </Text> */}
          <Image src= "https://ifh.cc/g/nn7mf5.png" />
        </Grid>
        <Grid is_flex>
          <Button text="로그인" _onClick={() => {history.push("/login")}}></Button>
          <Button text="회원가입" _onClick={() => {}}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
