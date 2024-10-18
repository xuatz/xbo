import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator } from '../services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return redirect('/');
  }
  return redirect('/login');
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate('github', request, {
      successRedirect: '/',
      failureRedirect: '/login',
    });
  } catch (error) {
    console.error('GitHub authentication error:', error);
    return redirect('/login?error=github_auth_failed');
  }
}
