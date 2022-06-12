import axios from 'axios'
import {
  ActionFunction,
  Form,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'remix'
import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'

const PROJECT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1Z3RudW1yYW1yYW14ZG1oZXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUwMTY0OTksImV4cCI6MTk3MDU5MjQ5OX0.7gNhY2GeXIYv3lsLTvpvmBdza0dYQ4szATwh37POZoE'
const supabase = createClient(
  'https://jugtnumramramxdmhexn.supabase.co',
  PROJECT_ANON_KEY,
)

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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  console.log('xz:url', url)
  const access_token = url.searchParams.get('access_token')

  console.log('xz:access_token', access_token)

  return json({ access_token })
}

type LoaderData = {
  access_token: string
}

export default function WelcomeRoute() {
  const data = useLoaderData<LoaderData>()

  console.log('xz:data', data)

  return <p>welcome</p>
}
