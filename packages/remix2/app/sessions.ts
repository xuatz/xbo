import { createCookieSessionStorage } from '@remix-run/node'

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__session', // TODO change this
      secrets: ['fancy-secret-key'], // TODO change this
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax', // TODO change this
      path: '/',
      httpOnly: true,
    },
  })
