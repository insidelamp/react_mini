import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostDetail from "./pages/PostDetail";
import PostAdd from "./pages/PostAdd";
import PostModify from "./pages/PostModify";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/detail" exact component={PostDetail} />
        <Route path="/add" exact component={PostAdd} />
        <Route path="/modify/:id" exact component={PostModify} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
