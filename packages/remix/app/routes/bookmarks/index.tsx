import type { LinksFunction } from 'remix'
import { Link } from 'remix'

import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
  ]
}

export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <h1>Xuatz Bookmark Organiser</h1>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <div>You are not logged into pushbullet yet</div>
      </div>
    </div>
  )
}
