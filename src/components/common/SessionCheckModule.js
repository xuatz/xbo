import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Login from "./Login";
import Signup from "./Signup";

import * as actions from "../../actions/userActions";

const mapStateToProps = state => {
    return {
        isCheckingSession: state.session.isCheckingSession,
        isLoggedIn: state.session.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => ({
    //xz: sample for different pattern to bindActionCreators
    // actions: bindActionCreators({
    // 	...inboundActions,
    // 	load: (line) => {
    // 		return (dispatch) => {
    // 			dispatch(actions.load('line', line))
    // 		}
    // 	}
    // }, dispatch)
    actions: bindActionCreators(actions, dispatch)
    // load: line => {
    // 	dispatch(actions.load("line", line));
    // }
});

class SessionCheckModule extends Component {
    state = {
        login: true
    };

    componentDidMount() {
        this.props.actions.checkUserSession();
    }

    changeMode = () => {
        this.setState({
            login: !this.state.login
        });
    };

    render() {
        return (
            <div>
                {this.props.isCheckingSession ? null : this.props.isLoggedIn ? (
                    this.props.children
                ) : this.state.login ? (
                    <Login
                        onSubmit={this.props.actions.login}
                        changeMode={this.changeMode}
                    />
                ) : (
                    <Signup
                        onSubmit={this.props.actions.signup}
                        changeMode={this.changeMode}
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionCheckModule);
