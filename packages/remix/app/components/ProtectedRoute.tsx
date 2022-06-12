import { ReactNode } from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'
import { createClient } from '@supabase/supabase-js'
import { redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

const PROJECT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NTIzNjc2MDAsCiAgICAiZXhwIjogMTgxMDEzNDAwMAp9.bs_wMls2vlVVaMGtr1YCXfKpIb74WR_8vSjJOncBn0M'
const supabase = createClient('https://supa-rest.camby.link', PROJECT_ANON_KEY)

const ProtectedRoute = ({
  children,
  requireAuth = true,
}: {
  children: ReactNode
  requireAuth?: boolean
}) => {
  const navigate = useNavigate()

  const session = supabase.auth.session()
  if (requireAuth && !session) {
    console.log('xz:yaho1')
    navigate('/auth2')
  }

  console.log('xz:yaho2')

  return <>{children}</>
}

export default ProtectedRoute
