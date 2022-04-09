import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./pages/PostList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
