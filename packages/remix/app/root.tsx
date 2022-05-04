import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  useCatch,
  useNavigate,
} from 'remix'
import SuperTokens from 'supertokens-auth-react'
import EmailPassword, {
  signOut,
} from 'supertokens-auth-react/recipe/emailpassword'
import Session, {
  useSessionContext,
} from 'supertokens-auth-react/recipe/session'
import { tw } from 'twind'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo'
import ProtectedRoute from './components/ProtectedRoute'
import globalLargeStylesUrl from './styles/global-large.css'
import globalMediumStylesUrl from './styles/global-medium.css'
import globalStylesUrl from './styles/global.css'

if (typeof window !== 'undefined') {
  SuperTokens.init({
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appInfo: {
      appName: 'xbo-dev',
      apiDomain: 'localhost:9000',
      websiteDomain: 'localhost:3000',
    },
    recipeList: [EmailPassword.init(), Session.init()],
  })
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: globalMediumStylesUrl,
      media: 'print, (min-width: 640px)',
    },
    {
      rel: 'stylesheet',
      href: globalLargeStylesUrl,
      media: 'screen and (min-width: 1024px)',
    },
  ]
}

export const meta: MetaFunction = () => {
  const description = `Learn Remix and laugh at the same time!`
  return {
    description,
    keywords: 'Remix,jokes',
    'twitter:image': 'https://remix-jokes.lol/social.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@remix_run',
    'twitter:site': '@remix_run',
    'twitter:title': 'Remix Jokes',
    'twitter:description': description,
  }
}

function Document({
  children,
  title = `Remix: So great, it's funny!`,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
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

export default function App() {
  return (
    <Document>
      <ApolloProvider client={apolloClient}>
        <ProtectedRoute requireAuth={false}>
          <Content />
        </ProtectedRoute>
      </ApolloProvider>
    </Document>
  )
}
