import { useEffect, useState } from 'react'
import { json, Link, LinksFunction, useLoaderData } from 'remix'
import styled from 'styled-components'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { tw } from 'twind'
import ProtectedRoute from '~/components/ProtectedRoute'
import stylesUrl from '~/styles/index.css'
import PushbulletLogo from '../../../public/assets/PushbulletLogo.png'
import { COLOR, FONT } from '../../components/styles'
/**
 * @todo what if i want to do
 * import { QueryUser } from 'common/queries/user' ?
 * how can i do it?
 */
import { QueryUser } from 'common'
import { useQuery } from '@apollo/client'

export const ProviderContainer = styled.section`
  display: flex;
  margin-bottom: 1rem;
`

export const Provider = styled.div`
  align-items: center;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.NEUTRAL.NORMAL};
  border-radius: 3px;
  box-shadow: rgb(0, 0, 0, 0.1) 0px 0px 3px;
  color: ${COLOR.NEUTRAL.DARKER};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  transition: all 0.3s;
  width: 200px;

  &:hover {
    color: ${COLOR.BLACK};
    transform: scale(1.05, 1.05);
  }
`

export const ProviderLogo = styled.img`
  width: 100px;
  height: 100px;
`

export const ProfileSettings = styled.section`
  margin: 1rem;
`

export const Header = styled.header`
  font-family: ${FONT.TITLE};
  font-size: 1.5rem;
  font-weight: 400;
`

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ]
}

export async function loader() {
  const API_URL = process.env.API_URL || 'http://localhost:9000'

  // TODO xz: pretty sure i can just ask for this URL from the server
  const PUSHBULLET_CLIENT_ID =
    process.env.PUSHBULLET_APP_CLIENT_ID || '2TXDmPJN0tukzOqu19qvwNCju16SyMb7'
  const PUSHBULLET_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${API_URL}/myauth/connect/pushbullet/callback&response_type=code`

  return json({
    PUSHBULLET_URL,
    isLoggedInToPushbullet: false,
  })
}

const Content = () => {
  const { PUSHBULLET_URL } = useLoaderData()
  const { userId, accessTokenPayload, doesSessionExist } = useSessionContext()

  const [isLoggedInToPushbullet, setIsLoggedInToPushbullet] = useState(false)

  const { loading, error, data, refetch } = useQuery(QueryUser, {
    variables: {
      id: userId,
    },
  })

  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [userId])

  const connectPushbulletProvider = () => {
    // window.location.href = 'https://google.com'
    window.location.href = PUSHBULLET_URL
  }

  return (
    <div>
      <Provider onClick={connectPushbulletProvider}>
        <img className={tw`h-24`} src={PushbulletLogo} />
        <div className={tw`p-2`} />
        <div onClick={connectPushbulletProvider}>
          {isLoggedInToPushbullet
            ? 'Connected with Pushbullet!'
            : 'Connect with Pushbullet'}
        </div>
      </Provider>
    </div>
  )
}
export default function Index() {
  return (
    <ProtectedRoute>
      <Content />
    </ProtectedRoute>
  )
}
