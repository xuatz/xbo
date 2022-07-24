import { ReactNode } from 'react'
import { Form, useTransition } from 'remix'

const Layout = ({
  children,
  showSignOut,
}: {
  children: ReactNode
  showSignOut?: boolean
}) => {
  const transition = useTransition()
  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-light">
          Remix <strong className="font-bold">Supabase</strong>
        </h1>
        {showSignOut && (
          <Form action="/sign-out" method="post">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
              aria-live="polite"
              disabled={transition.state !== 'idle'}
            >
              {transition.state !== 'idle' ? 'Loading...' : 'Sign out'}
            </button>
          </Form>
        )}
      </header>
      <main className="w-full md:w-3/4 lg:w-2/4 mx-auto py-6 my-6">
        {children}
      </main>
    </div>
  )
}
export default Layout
