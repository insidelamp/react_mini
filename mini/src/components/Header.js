import React from "react";
import { Button, Grid, Text } from "../elements";

const Header = () => {
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            혼자같이
          </Text>
        </Grid>
        <Grid is_flex>
          <Button text="로그인" _onClick={() => {}}></Button>
          <Button text="회원가입" _onClick={() => {}}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
