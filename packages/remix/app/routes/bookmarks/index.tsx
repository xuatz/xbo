import { Link } from 'remix'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import ProtectedRoute from '~/components/ProtectedRoute'
import { createCookie, LoaderFunction } from '@remix-run/node' // or "@remix-run/cloudflare"
import { Outlet } from '@remix-run/react'
import Session from 'supertokens-node/recipe/session'

type LoaderData = {
  // joke: Joke; isOwner: boolean
}

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('xz:request', request)

  // let userId = 'ba5cb9ee-185d-4dbc-9281-440b8084558f' // fetch somehow

  // // sessionHandles is string[]
  // let sessionHandles = await Session.getAllSessionHandlesForUser(userId)

  // const userId = await getUserId(request)

  // const joke = await db.joke.findUnique({
  //   where: { id: params.jokeId },
  // })
  // if (!joke) {
  //   throw new Response('What a joke! Not found.', {
  //     status: 404,
  //   })
  // }
  // const data: LoaderData = {
  //   joke,
  //   isOwner: userId === joke.jokesterId,
  // }
  // return data
  return null
}

export default function Index() {
  return <div>This is the bookmarks index route!</div>
}
