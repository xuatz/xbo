import { ReactNode } from 'react'
import { Link, LoaderFunction } from 'remix'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import ProtectedRoute from '~/components/ProtectedRoute'
import { redirect } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { Navigate } from 'react-router-dom'

const PROJECT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NTIzNjc2MDAsCiAgICAiZXhwIjogMTgxMDEzNDAwMAp9.bs_wMls2vlVVaMGtr1YCXfKpIb74WR_8vSjJOncBn0M'
const supabase = createClient('https://supa-rest.camby.link', PROJECT_ANON_KEY)

export default function Index() {
  const navigate = useNavigate()
  const session = supabase.auth.session()

  console.log('xz:session', session)

  if (session === null) {
    console.log('xz:hey')
    navigate('/auth2')
    return null
  }

  return <Outlet />
}
