import { Link, Router } from '@reach/router';
import * as React from 'react';

import Gallery from 'src/pages/Gallery';
import MainPage from 'src/pages/MainPage';
import MainPageV2 from './components/MainPageV2';
import Organiser from 'src/pages/Organiser';
import Profile from 'src/pages/Profile';
import { Provider } from 'react-redux';
import SessionCheckModule from './components/common/SessionCheckModule';
import StreamPage from 'src/pages/StreamPage';
import SummaryPage from 'src/pages/SummaryPage';
import configureStore from './store';
import styled from 'styled-components';

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

const App = () => {
  return (
    <Provider store={store}>
      <SessionCheckModule>
        <Container>
          <Header />
          <Body>
            <Router>
              <MainPage path="/" />
              <MainPageV2 path="/v2" />
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
};

export default App;
