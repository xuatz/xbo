import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';
import { pb } from './db.server';
import { sessionStorage } from './session.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator(sessionStorage);

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: import.meta.env.VITE_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5173/auth/github/callback',
  },
  async ({ accessToken, extraParams, profile }) => {
    console.log('xz:accessToken', accessToken);
    console.log('xz:extraParams', extraParams);
    console.log('xz:profile', profile);

    // User.findOrCreate({ email: profile.emails[0].value });

    try {
      // TODO might want to restrict this to an admin action
      const { totalItems, items } = await pb.collection('users').getList(1, 1, {
        filter: `providers.github.profile._json.email = "${profile._json.email}"`,
      });

      if (totalItems === 0) {
        console.debug('creating new user')
        const user = await pb.collection('users').create({
          providers: {
            github: {
              accessToken,
              extraParams,
              profile,
            },
          },
        });
        return user;
      }

      const user = items[0];
      console.debug('updating existing user')
      const updatedUser = await pb.collection('users').update(user.id, {
        ...items[0],
        providers: {
          ...items[0].providers,
          github: {
            accessToken,
            extraParams,
            profile,
          },
        },
      });
      return updatedUser;
    } catch (err) {
      console.error(err);
    }

    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
  }
);

authenticator.use(gitHubStrategy);
