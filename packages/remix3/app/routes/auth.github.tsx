import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export async function loader() {
  return redirect('/login');
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate('github', request);
}
