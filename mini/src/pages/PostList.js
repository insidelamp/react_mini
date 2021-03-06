import React, { useEffect } from "react";
import axios from "axios";
import { __loadPost } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import { Grid, Button, Input, Text } from "../elements";
import Post from "../components/Post";
import { history } from "../redux/configureStore";
import {IoIosAddCircle} from "react-icons/io";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => post.post);
  const posit = useSelector((props) => props);
  console.log(posit);

  console.log(post);

  useEffect(() => {
    if (post.length === 0) {
      dispatch(postActions.loadPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid margin="10px">
        {post.map((p, idx) => {
          return (
            <Grid>
              <Post {...p} />
            </Grid>
          );
        })}
      </Grid>
      
      <IoIosAddCircle size="80" color="#262a2a" 
      
        onClick={(event) => {
          history.push(`/add`);
          event.stopPropagation();
        }}/>
      
      
    </React.Fragment>
  );
};

export default PostList;
