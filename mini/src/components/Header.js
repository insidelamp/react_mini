import React from "react";
import { Button, Grid, Text, Image } from "../elements";
import { history } from "../redux/configureStore";

const Header = () => {
  
  
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
