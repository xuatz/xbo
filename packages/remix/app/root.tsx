import { QueryClient, QueryClientProvider } from 'react-query'
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
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
import ProtectedRoute from './components/ProtectedRoute'
import { commitSession, destroySession, getSession } from './session'

import install from '@twind/with-remix'
import config from '../twind.config'

install(config)

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  SuperTokens.init({
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appInfo: {
      appName: 'xbo-dev',
      apiDomain: 'localhost:9000',
      websiteDomain: 'localhost:3000',
    },
    recipeList: [EmailPassword.init(), Session.init()],
  })

  const { worker } = require('../bleublanc/mocks/browser')
  worker.start()
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
  const { doesSessionExist } = useSessionContext()
  let navigate = useNavigate()

  return (
    <div className="container bg-yellow-800 py-2">
      <div className="flex justify-between items-center py-4">
        <h1 className="bg-pink-800 text-5xl">Xuatz Bookmark Manager</h1>
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

const queryClient = new QueryClient()

export default function App() {
  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </Document>
  )
}
