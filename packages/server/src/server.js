if (!process.env.NODE_ENV) {
  require('dotenv').config()
}

const express = require('express')

// const passport = require('passport')
// const session = require('express-session')
// const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const { uri } = require('./models/mongoose')
const User = require('./models/user')
const { supertokens } = require('./supertoken')
let {
  verifySession,
} = require('supertokens-node/recipe/session/framework/express')
let {
  middleware: supertokenMiddleware,
  errorHandler: supertokenErrorHandler,
} = require('supertokens-node/framework/express')

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:7881',
    'https://xbo.xuatz.com',
  ],
  allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // preflightContinue: true,
}

//==============================================================

// passport.serializeUser(function (user, cb) {
//   // console.log("serializeUser()");
//   cb(null, user.id)
// })

// passport.deserializeUser(function (id, cb) {
//   // console.log("deserializeUser()");
//   User.findById(id, (err, user) => {
//     if (err) {
//       return cb(err)
//     }
//     return cb(null, user)
//   })
// })

//==============================================================
//==============================================================

let app = express()

//==============================================================

// let sessionOptions = {
//   store: new MongoDBStore({
//     uri,
//     collection: 'sessions',
//   }),
//   secret: 'truly a secretive secret',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {},
// }

// if (app.get('env') === 'production') {
//   sessionOptions.cookie.secure = true // serve secure cookies
// }

//==============================================================

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

// app.use('/auth', require('./api/auth').router)
app.use('/bookmarks', require('./api/bookmarks').router)

app.get('/sessioninfo', verifySession(), async (req, res) => {
  const session = req.session

  res.send({
    sessionHandle: session.getHandle(),
    userId: session.getUserId(),
    jwtPayload: session.getJWTPayload(),
    sessionData: await session.getSessionData(),
  })
})

//==============================================================
// error handlers
//==============================================================

app.use(supertokenErrorHandler())

app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})

require('./cronjobs')
