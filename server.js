const path = require('path')
const express = require('express')
const webpack = require('webpack')
const env = require('node-env-file')
// const passport = require('passport')
const cookieSession = require('cookie-session')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.config')
env(path.join(__dirname, '/.env'))

const PORT = 12345
const index = path.join(__dirname, '/index.html')
const compiler = webpack(webpackConfig)

const app = express()
const webpackMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'app',
  stats: {
    colors: true,
    timings: true
  }
})
app.use(webpackMiddleware)
app.use(webpackHotMiddleware(compiler))
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000 * 365 * 5, // 5 years because lol dev
  secret: process.env.SESSION_KEY
}))
// app.use(passport.initialize())
// app.use(passport.session())

app.get('/', (req, res) => {
  // Object.keys(req.query).forEach((param) => {
  //   const value = req.query[param]
  //   console.log('setting session parameter "%s" to "%s"', param, value)
  //   req.session[param] = value
  // })
  res.write(webpackMiddleware.fileSystem.readFileSync(index))
  res.end()
})

app.get('/login', (req, res) => {
  res.write('lol')
  res.end()
})

// app.get('/tweets', (req, res) => {
//   console.log('req.query', req.query)
//
//   res.status(200).send(renderTwitterWidget(req.query))
//   res.end()
// })
//
// const renderTwitterWidget = ({ encodedSearchTerm, searchTerm }) => `${searchTerm}, ${encodedSearchTerm}`

app.get('/oauth/twitter/callback', (req, res) => {
  res.write('lolwut')
  req.session.token = req.query.token
})

app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT)
})
