import './supertokens';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { getAllCORSHeaders } from 'supertokens-node';
import {
    errorHandler as supertokenErrorHandler, middleware as supertokenMiddleware
} from 'supertokens-node/framework/express';
import * as Session from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

import type { SessionRequest } from 'supertokens-node/framework/express'

dotenv.config()

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:7881',
    'https://xbo.xuatz.com',
  ],
  allowedHeaders: ['content-type', ...getAllCORSHeaders()],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // preflightContinue: true,
}

const app = express()

app.set('trust proxy', true) //for express to trust nginx for https delivery
app.use(cors(corsOptions))

// app.use(require('morgan')('combined'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(session(sessionOptions))
// app.use(passport.initialize())
// app.use(passport.session())
app.use(supertokenMiddleware())

//==============================================================

app.all('*', (req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  } else {
    next()
  }
})

//==============================================================
// api routes
//==============================================================

app.use('/myauth', require('./api/auth').router)
app.use('/bookmarks', require('./api/bookmarks').router)
app.get('/sessioninfo', verifySession(), async (req: SessionRequest, res) => {
  const { session } = req

  res.send({
    sessionHandle: session?.getHandle(),
    userId: session?.getUserId(),
    jwtPayload: session?.getJWTPayload(),
    sessionData: await session?.getSessionData(),
  })
})

app.post('/debug/create-new-session', async (req, res) => {
  const XZLOW10_USER_ID = 'ba5cb9ee-185d-4dbc-9281-440b8084558f'
  await Session.createNewSession(res, XZLOW10_USER_ID, {}, {})
  res.send({
    message: 'New user session created',
  })
})

//==============================================================
// error handlers
//==============================================================

app.use(supertokenErrorHandler())

app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})
