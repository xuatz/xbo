import { ReactNode } from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'

const ProtectedRoute = ({
  children,
  requireAuth = true,
}: {
  children: ReactNode
  requireAuth?: boolean
}) => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <EmailPasswordAuth requireAuth={requireAuth}>{children}</EmailPasswordAuth>
  )
}

export default ProtectedRoute
