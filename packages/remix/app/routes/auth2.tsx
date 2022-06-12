import axios from 'axios'
import { ActionFunction, Form, json, LinksFunction, redirect } from 'remix'
import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'

const PROJECT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NTIzNjc2MDAsCiAgICAiZXhwIjogMTgxMDEzNDAwMAp9.bs_wMls2vlVVaMGtr1YCXfKpIb74WR_8vSjJOncBn0M'
const supabase = createClient('https://supa-rest.camby.link', PROJECT_ANON_KEY)

const Container = (props: any) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export const action: ActionFunction = async ({ request }) => {
  console.log('xz:hi1')
  const formData = await request.formData()
  console.log('xz:formData', formData)

  // const data = {
  //   formFields: [
  //     {
  //       id: 'email',
  //       value: formData.get('email'),
  //     },
  //     {
  //       id: 'password',
  //       value: formData.get('password'),
  //     },
  //   ],
  // }

  const data = {
    formFields: [
      { id: 'email', value: 'asdsdasd' },
      { id: 'password', value: 'asdsadsd' },
    ],
  }

  console.log('xz:hey1')

  // const res = await fetch('http://localhost:9000/auth/signin', {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })

  // const res1 = await axios.get('http://localhost:9000')
  // console.log('xz:res1', res1)

  const res2 = await axios.post('http://localhost:9000')
  console.log('xz:res2', res2)

  // const res = await axios.get('http://localhost:9000/auth/signin')
  // const res = await axios.post('http://localhost:9000/auth/signin', {
  //   headers: {
  //     'Access-Control-Request-Headers': 'content-type,fdi-version,rid',
  //   },
  //   data,
  // })
  // console.log('xz:res', res)

  // console.log('xz:hey2')

  return json({ ok: true })
}

export default function AuthRoute() {
  const session = supabase.auth.session()
  console.log('xz:session', session)

  return (
    <div>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
          <Auth
            onlyThirdPartyProviders={true}
            supabaseClient={supabase}
            providers={['github']}
            redirectTo={'/oauth/success'}
          />
        </Container>
      </Auth.UserContextProvider>
    </div>
  )
}
