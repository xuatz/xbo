import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (typeof window === 'undefined') {
    return null
  }

  return <EmailPasswordAuth>{children}</EmailPasswordAuth>
}

export default ProtectedRoute
