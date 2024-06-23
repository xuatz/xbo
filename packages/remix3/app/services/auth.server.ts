import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';
import { sessionStorage } from '~/services/session.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: import.meta.env.VITE_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5173/auth/github/callback',
  },
  async ({ accessToken, extraParams, profile }) => {
    console.log('xz:accessToken', accessToken);
    console.log('xz:extraParams', extraParams);
    console.log('xz:profile', profile);
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
  }
);

authenticator.use(gitHubStrategy);
