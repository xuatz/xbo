import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Link } from '@reach/router';
import styled from 'styled-components';

import SessionCheckModule from '../components/common/SessionCheckModule';

import MainPage from '../components/MainPage';
import SummaryPage from '../components/SummaryPage';
import StreamPage from '../components/StreamPage';
import Profile from '../components/Profile';
import Organiser from '../components/Organiser';
import Gallery from '../components/Gallery';

import AboutPage from '../components/AboutPage';

import configureStore from '../store';

let store = configureStore();

const Header = () => (
  <MyNav>
    <Link to="/">Home</Link>
    <Link to="summary">Summary</Link>
    <Link to="stream">Stream</Link>
    <Link to="gallery">Gallery</Link>
    <Link to="profile">Profile</Link>
    <Link to="organiser">Organiser</Link>
  </MyNav>
);

const MyNav = styled.nav`
  display: flex;
  background: red;
  padding: 5px 20px;
  align-items: center;
`;

const Body = styled.div`
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SessionCheckModule>
          <Container>
            <Header />
            <Body>
              <Router>
                <MainPage path="/" />
                <SummaryPage path="/summary" />
                <StreamPage path="/stream" />
                <Gallery path="/gallery" />
                <Profile path="/profile" />
                <Organiser path="/organiser" />
              </Router>
            </Body>
          </Container>
        </SessionCheckModule>
      </Provider>
    );
  }
}

export default App;
