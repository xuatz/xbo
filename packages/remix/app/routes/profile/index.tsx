import { json, Link, LinksFunction, useLoaderData } from 'remix'
import styled from 'styled-components'
import stylesUrl from '~/styles/index.css'
import PushbulletLogo from '../../../public/assets/PushbulletLogo.png'
import { COLOR, FONT } from '../../components/styles'

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
  padding-bottom: 1rem;
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
  })
}

export default function Index() {
  const data = useLoaderData()

  const connectPushbulletProvider = () => {
    // window.location.href = 'https://google.com'
    window.location.href = data.PUSHBULLET_URL
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Xuatz Bookmark Organiser</h1>
        <div>You are not logged into pushbullet yet</div>

        <div style={{ height: 50 }}>
          <Provider onClick={connectPushbulletProvider}>
            <ProviderLogo src={PushbulletLogo} />
            {/* <div onClick={this.props.actions.connectPushbulletProvider}>
            {this.props.providers && this.props.providers.pushbullet
                ? 'Connected with Pushbullet!'
                : 'Connect with Pushbullet'}
            </div> */}
          </Provider>
        </div>
      </div>
    </div>
  )
}
