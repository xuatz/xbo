import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SessionCheckModule from "../components/common/SessionCheckModule";

import MainPage from "../components/MainPage";
import Profile from "../components/Profile";
import Organiser from "../components/Organiser";
import Gallery from "../components/Gallery";

import AboutPage from "../components/AboutPage";

import configureStore from "../store";

let store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SessionCheckModule>
          <Router>
            <div>
              {/* <Header /> */}
              <Route exact path="/" component={MainPage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/organiser" component={Organiser} />
              <Route exact path="/curated" component={MainPage} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/all" component={MainPage} />
            </div>
          </Router>
        </SessionCheckModule>
      </Provider>
    );
  }
}

export default App;
