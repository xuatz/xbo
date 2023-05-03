import * as actions from 'src/actions/userActions';

import {
  Header,
  ProfileSettings,
  Provider,
  ProviderContainer,
  ProviderLogo,
} from './styles';
import React, { Component } from 'react';

import Button from 'src/components/Button/Button';
import Page from 'src/components/Page';
import PushbulletLogo from './PushbulletLogo.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  let providers = {};
  // TODO xz: im pretty sure this can be avoided with some better data model design
  if (state.session) {
    if (state.session.user) {
      providers = state.session.user.providers;
    }
  }

  return {
    providers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

class Profile extends Component {
  renderPushbulletProvider() {
    return (
      <Provider onClick={this.props.actions.connectPushbulletProvider}>
        <ProviderLogo src={PushbulletLogo} />
        <div onClick={this.props.actions.connectPushbulletProvider}>
          {this.props.providers && this.props.providers.pushbullet
            ? 'Connected with Pushbullet!'
            : 'Connect with Pushbullet'}
        </div>
      </Provider>
    );
  }

  render() {
    return (
      <Page>
        <Header>Manage Providers</Header>
        <ProviderContainer>{this.renderPushbulletProvider()}</ProviderContainer>
        <Header>Manage Profile</Header>
        <ProfileSettings>
          <Button onClick={this.props.actions.logout}>Logout</Button>
        </ProfileSettings>
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
