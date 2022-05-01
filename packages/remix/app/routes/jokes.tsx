import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from 'remix'
import ProtectedRoute from '~/components/ProtectedRoute'
import stylesUrl from '~/styles/jokes.css'
// import { db } from '~/utils/db.server'
// import { getUser } from '~/utils/session.server'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

type LoaderData = {
  // user: Awaited<ReturnType<typeof getUser>>
  jokeListItems: Array<{ id: string; name: string }>
}

// export const loader: LoaderFunction = async ({ request }) => {
//   const jokeListItems = await db.joke.findMany({
//     take: 5,
//     orderBy: { createdAt: 'desc' },
//     select: { id: true, name: true },
//   })
//   const user = await getUser(request)

//   const data: LoaderData = {
//     jokeListItems,
//     user,
//   }
//   return data
// }

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <ProtectedRoute>
      <div className="jokes-layout">
        <header className="jokes-header">
          <div className="container">
            <h1 className="home-link">
              <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
                <span className="logo">🤪</span>
                <span className="logo-medium">J🤪KES</span>
              </Link>
            </h1>
            <Link to="/login">Login</Link>
          </div>
        </header>
        <main className="jokes-main">
          <div className="container">
            <div className="jokes-list">
              <Link to=".">Get a random joke</Link>
              <p>Here are a few more jokes to check out:</p>
              <Link to="new" className="button">
                Add your own
              </Link>
            </div>
            <div className="jokes-outlet">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
