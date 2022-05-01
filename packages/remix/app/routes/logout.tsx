import type { ActionFunction, LoaderFunction } from 'remix'
import { redirect } from 'remix'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'

export const action: ActionFunction = async ({ request }) => {
  await signOut()
}

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
