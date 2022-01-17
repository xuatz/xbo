import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect, useDispatch } from 'react-redux'

import { Container } from './FlexContainer'
import Login from './Login'
import Signup from './Signup'

import * as actions from '../../actions/userActions'

const mapStateToProps = (state) => {
  return {
    isCheckingSession: state.session.isCheckingSession,
    isLoggedIn: state.session.isLoggedIn,
  }
}

const SessionCheckModule = (props) => {
  const [login, setLogin] = useState(true)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.checkUserSession())
  }, [dispatch])

  const changeMode = () => {
    console.log('hi1')
    setLogin(!login)
  }

  return (
    <div>
      {props.isCheckingSession ? null : props.isLoggedIn ? (
        props.children
      ) : (
        <Container style={{ justifyContent: 'center' }}>
          {login ? (
            <Login
              onSubmit={() => {
                dispatch(actions.login())
              }}
              changeMode={() => {
                console.log('hi2')
                changeMode()
              }}
            />
          ) : (
            <Signup
              onSubmit={() => {
                dispatch(actions.signup())
              }}
              changeMode={changeMode}
            />
          )}
        </Container>
      )}
    </div>
  )
}

export default connect(mapStateToProps)(SessionCheckModule)
