import * as actions from '../../actions/userActions';

import React, { Component } from 'react';

import { Container } from './FlexContainer';
import Login from './Login';
import Signup from './Signup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const skipLogin = false;

const mapStateToProps = state => {
  return {
    isCheckingSession: state.session.isCheckingSession,
    isLoggedIn: state.session.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

class SessionCheckModule extends Component {
  state = {
    login: true,
  };

  componentDidMount() {
    this.props.actions.checkUserSession();
  }

  changeMode = () => {
    this.setState({
      login: !this.state.login,
    });
  };

  render() {
    return (
      <div>
        {this.props.isCheckingSession ? null : this.props.isLoggedIn ? (
          this.props.children
        ) : (
          <Container style={{ justifyContent: 'center' }}>
            {this.state.login ? (
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
          </Container>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionCheckModule);
