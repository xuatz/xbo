import React, { Component } from "react";
import { Provider } from "react-redux";

// import Layout from '../components/common/MyLayout'
import SessionCheckModule from "../components/common/SessionCheckModule";
import MainPage from "./MainPage";

import configureStore from "../store";

let store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SessionCheckModule>
                    <MainPage />
                </SessionCheckModule>
            </Provider>
        );
    }
}

export default App;
