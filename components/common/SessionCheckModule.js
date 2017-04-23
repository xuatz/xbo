import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Promise from 'bluebird'

import { initStore } from '../../store'
import { login, signup } from '../../actions/userActions'

import Login from './Login'
import Signup from './Signup'

const mapStateToProps = state => {
	return {
		isLoggedIn: state.session.user ? true : false,
	}
}

class SessionCheckModule extends Component {
	state = {
		login: true,
	}

	componentDidMount() {
		// this.props.dispatch(checkLoginSession());
	}

	login = params => {
		return this.props.dispatch(login(form))
	}

	signup = form => {
		return this.props.dispatch(signup(form))
	}

	changeMode = () => {
		this.setState({
			login: !this.state.login,
		})
	}

	render() {
		return (
			<div>
				{this.props.isLoggedIn
					? this.props.children
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
		)
	}
}

export default withRedux(initStore, mapStateToProps)(SessionCheckModule)
