import type { LinksFunction } from 'remix'
import SuperTokens from 'supertokens-auth-react'

import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ]
}

export default function AuthRoute() {
  if (typeof window !== 'undefined' && SuperTokens.canHandleRoute()) {
    // This renders the login UI on the /auth route
    return <>{SuperTokens.getRoutingComponent()}</>
  }

  return (
    <div className="container">
      <div className="content">
        {/* nothing here */}
        {/* @todo i could put a spinner in future */}
      </div>
    </div>
  )
}
