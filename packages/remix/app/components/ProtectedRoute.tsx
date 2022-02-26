import { ReactNode } from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (typeof window === 'undefined') {
    return null
  }

  return <EmailPasswordAuth>{children}</EmailPasswordAuth>
}

export default ProtectedRoute
