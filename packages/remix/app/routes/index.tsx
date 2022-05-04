import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { json, Link, LinksFunction, redirect, useLoaderData } from 'remix'
import {
  signOut,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session'
import { tw } from 'twind'
import ProtectedRoute from '~/components/ProtectedRoute'
import { Outlet } from '@remix-run/react'

export async function loader() {
  // const cookieHeader = request.headers.get('sAccessToken')
  // console.log('xz:cookieHeader', cookieHeader)

  // const { userId, accessTokenPayload } = useSessionContext()
  // console.log('xz:userId', userId)
  // console.log('xz:accessTokenPayload', accessTokenPayload)

  // const res = await axios.get('http://localhost:9000/sessioninfo')
  // console.log('xz:res', res)

  return json({
    isLoggedIn: false,
  })
}

const Content = () => {
  const { userId, accessTokenPayload, doesSessionExist } = useSessionContext()
  let navigate = useNavigate()

  return (
    <div className={tw`container bg-yellow-800 py-2`}>
      <div className={tw`flex justify-between items-center py-4`}>
        <h1 className={tw`bg-pink-800 text-5xl`}>Xuatz Bookmark Manager</h1>
        <button
          className={tw`rounded-full bg-purple-700 px-6 py-1`}
          onClick={async () => {
            if (doesSessionExist) {
              await signOut()
            } else {
              return navigate('/auth')
            }
          }}
        >
          {doesSessionExist ? 'Logout' : 'Login'}
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default function Index() {
  return <p>placeholder content</p>
}
