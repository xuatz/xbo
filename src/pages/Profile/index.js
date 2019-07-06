import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions/userActions';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Button = styled.button`
  padding: 20px;
  background: yellow;
`;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

// TODO xz: pretty sure i can just ask for this URL from the server
const PUSHBULLET_CLIENT_ID =
  process.env.REACT_APP_PUSHBULLET_APP_CLIENT_ID ||
  '2TXDmPJN0tukzOqu19qvwNCju16SyMb7';
const url = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${API_URL}/auth/connect/pushbullet/callback&response_type=code`;

const mapStateToProps = state => {
  let providers = {};
  // TODO xz: im pretty sure this can be avoided with some better data model design
  if (state.session) {
    if (state.session.user) {
      providers = state.session.user.providers;
    }
  }

  return {
    providers
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class Profile extends Component {
  render() {
    return (
      <>
        <Wrapper>
          {this.props.providers && this.props.providers.pushbullet ? (
            'Connected with Pushbullet!'
          ) : (
              <a href={encodeURI(url)}>
                <button>Connect with pushbullet</button>
              </a>
            )}
        </Wrapper>
        <div>
          <Button
            onClick={() => {
              this.props.actions.logout();
            }}
          >
            LOGOUT
          </Button>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
