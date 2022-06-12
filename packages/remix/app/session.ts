import { createCookieSessionStorage } from '@remix-run/node'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',
      httpOnly: true,
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: true,
    },
  })

export { getSession, commitSession, destroySession }
