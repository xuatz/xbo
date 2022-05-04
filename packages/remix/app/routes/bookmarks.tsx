import { Link } from 'remix'
import { Outlet } from '@remix-run/react'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import ProtectedRoute from '~/components/ProtectedRoute'

export default function Index() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}
