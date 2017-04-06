import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Promise from 'bluebird';

import { initStore, signup } from '../../store';

import Login from './Login';
import Signup from './Signup';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.session.user ? true : false,
    };
};

class SessionCheckModule extends Component {
    state = {
        login: true, // false => 'signup'
    };

    componentDidMount() {
        //TODO
        // this.props.dispatch(checkLoginSession());
    }

    login = params => {
        // this.props.dispatch(login(params));
    };

    signup = form => {
        console.log(form);

        return this.props
            .dispatch(signup(form))
            .then(res => {
                if (res.error) {
                    return {
                        error: res.error,
                    };
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    error: 'Server Error!!',
                };
            });
    };

    changeMode = () => {
        this.setState({
            login: !this.state.login,
        });
    };

    render() {
        return (
            <div>
                {this.props.isLoggedIn
                    ? props.children
                    : this.state.login
                          ? <Login
                                onSubmit={this.login}
                                changeMode={this.changeMode}
                            />
                          : <Signup
                                onSubmit={this.signup}
                                changeMode={this.changeMode}
                            />}
            </div>
        );
    }
}

export default withRedux(initStore, mapStateToProps)(SessionCheckModule);
