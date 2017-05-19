import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Promise from 'bluebird';

import { initStore } from '../../store';
import { login, signup, checkUserSession } from '../../actions/userActions';

import Layout from './MyLayout.js';
import Login from './Login';
import Signup from './Signup';

import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

const mapStateToProps = state => {
	return {
		isCheckingSession: state.session.isCheckingSession,
		isLoggedIn: state.session.isLoggedIn
	};
};

class SessionCheckModule extends Component {
	state = {
		login: true
	};

	componentDidMount() {
		this.props.dispatch(checkUserSession());
	}

	login = form => {
		return this.props.dispatch(login(form));
	};

	signup = form => {
		return this.props.dispatch(signup(form));
	};

	changeMode = () => {
		this.setState({
			login: !this.state.login
		});
	};

	render() {
		return (
			<div>
				{this.props.isCheckingSession
					? null
					: this.props.isLoggedIn
							? this.props.children
							: this.state.login
									? <Login onSubmit={this.login} changeMode={this.changeMode} />
									: <Signup
											onSubmit={this.signup}
											changeMode={this.changeMode}
										/>}
			</div>
		);
	}
}

export default withRedux(initStore, mapStateToProps)(SessionCheckModule);
