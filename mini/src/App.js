import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
