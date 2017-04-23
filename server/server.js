if (!process.env.NODE_ENV) {
	require('dotenv').config()
}

var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const bodyParser = require('body-parser')
const cors = require('cors')

const User = require('./models/user')

let corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: true,
}

//==============================================================

passport.serializeUser(function(user, cb) {
	console.log('serializeUser()')
	cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
	console.log('deserializeUser()')
	User.findById(id, (err, user) => {
		if (err) {
			return cb(err)
		}
		return cb(null, user)
	})
})

//==============================================================
//==============================================================

//==============================================================
//==============================================================

let app = express()

app.set('trust proxy', true) //for express to trust nginx for https delivery
app.use(cors(corsOptions))

// app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(
	session({
		store: new RedisStore(),
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())

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

app.get('/', (req, res) => {
	res.send('hi guys')
})

// app.use(require('./api/random.js'));
app.use(require('./api/auth.js'))

app.listen(9000, function() {
	console.log('Example app listening on port 9000!')
})
