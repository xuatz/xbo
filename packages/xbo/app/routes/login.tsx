import { LoaderFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '../services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export default function Login() {
  return (
    <Form action="/auth/github" method="post">
      <button>Login with GitHub</button>
    </Form>
  );
}
