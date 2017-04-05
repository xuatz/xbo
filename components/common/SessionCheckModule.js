import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore, fetchBookmarks } from '../../store';

import Login from './Login';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.session.user ? true : false
    };
};

class SessionCheckModule extends Component {
    state = {
        mode: 'login' // 'signup'
    };

    componentDidMount() {
        //TODO
        // this.props.dispatch(checkLoginSession());
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn
                    ? props.children
                    : this.state.mode == 'login' ? <Login /> : <SignUp />}
            </div>
        );
    }
}

export default withRedux(initStore, mapStateToProps)(SessionCheckModule);
