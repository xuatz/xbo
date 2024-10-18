import { Authenticator } from 'remix-auth';
import { GitHubProfile, GitHubStrategy } from 'remix-auth-github';
import { pb } from './db.server';
import { sessionStorage } from './session.server';

type User = {
  id: string;
  providers: {
    github: {
      profile: GitHubProfile;
    };
  };
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const gitHubStrategy = new GitHubStrategy<User>(
  {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    redirectURI: 'http://localhost:5173/auth/github/callback',
  },
  async ({ profile, tokens, request, context }) => {
    console.log('xz:profile', profile);
    console.log('xz:tokens', tokens);
    console.log('xz:request', request);
    console.log('xz:context', context);

    try {
      const { totalItems, items } = await pb.collection('users').getList(1, 1, {
        filter: `providers.github.profile._json.email = "${profile._json.email}"`,
      });

      if (totalItems === 0) {
        console.debug('creating new user')
        const user = await pb.collection('users').create({
          providers: {
            github: {
              profile,
              tokens,
            },
          },
        });
        return user as unknown as User;
      }

      const user = items[0];
      console.debug('updating existing user')
      const updatedUser = await pb.collection('users').update(user.id, {
        ...items[0],
        providers: {
          ...items[0].providers,
          github: {
            profile,
            tokens,
          },
        },
      });
      return updatedUser as unknown as User;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

authenticator.use(gitHubStrategy);
