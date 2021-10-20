// import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'

Session.addAxiosInterceptors(axios)

const MainPageV3 = () => {
  const history = useHistory()

  async function onClickLogout() {
    await signOut()
    history.push('/auth')
  }

  return (
    <>
      <p>just saying hi</p>

      <button
        onClick={async () => {
          const res = await axios.get('http://localhost:9000/sessioninfo')
          console.log(res)
        }}
      >
        go havoc
      </button>

      <button onClick={onClickLogout}>Logout</button>
    </>
  )
}

export default MainPageV3
