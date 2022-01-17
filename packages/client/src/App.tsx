import { Provider } from 'react-redux'
import * as ReactRouterDom from 'react-router-dom'
import Gallery from 'src/pages/Gallery'
import MainPage from 'src/pages/MainPage'
import Profile from 'src/pages/Profile'
import styled from 'styled-components'
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'
// import SessionCheckModule from './components/common/SessionCheckModule'
import MainPageV2 from './components/MainPageV2'
import MainPageV3 from './components/MainPageV3'
import configureStore from './store'

const { BrowserRouter: Router, Link, Route, Switch } = ReactRouterDom

const MyNav = styled.nav`
  display: flex;
  background: red;
  padding: 5px 20px;
  align-items: center;
`

const Header = () => (
  <MyNav>
    <Link to="/">Home</Link>
    <Link to="summary">Summary</Link>
    <Link to="stream">Stream</Link>
    <Link to="gallery">Gallery</Link>
    <Link to="profile">Profile</Link>
    <Link to="organiser">Organiser</Link>
  </MyNav>
)

const Body = styled.div`
  overflow-y: auto;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

let store = configureStore()

SuperTokens.init({
  appInfo: {
    appName: 'xbo-dev',
    apiDomain: 'localhost:9000',
    websiteDomain: 'localhost:3000',
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: 'REQUIRED',
      },
    }),
    Session.init(),
  ],
})

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {getSuperTokensRoutesForReactRouterDom({ ...ReactRouterDom })}
          <Route>
            {/* This protects the "/" route so that it shows 
                <Home /> only if the user is logged in.
                Else it redirects the user to "/auth" */}
            <EmailPassword.EmailPasswordAuth
              onSessionExpired={() => {
                // updateShowSessionExpiredPopup(true)
              }}
            >
              <Container>
                <Header />
                <Body>
                  <Route exact path="/">
                    <MainPage />
                  </Route>
                  <Route path="/v2">
                    <MainPageV2 />
                  </Route>
                  <Route path="/v3">
                    <MainPageV3 />
                  </Route>
                  <Route path="/gallery">
                    <Gallery />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                </Body>
              </Container>
              {/* {showSessionExpiredPopup && <SessionExpiredPopup />} */}
            </EmailPassword.EmailPasswordAuth>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
