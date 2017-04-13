const axios = require('axios')
const cookieSession = require('cookie-session')
const env = require('node-env-file')
const express = require('express')
const path = require('path')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

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

const authorizeTwitter = async () => {
  const requestUrl = 'https://api.twitter.com/oauth2/token'
  const headers = {
    headers: {
      Authorization: `Basic ${process.env.ENCODED_TWITTER_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  const data = 'grant_type=client_credentials'

  const response = await axios.post(requestUrl, data, headers)
  console.log('token', response.data.access_token)
  return response.data.access_token
}

app.get('/', async (req, res) => {
  req.session.jwt = req.query.jwt

  const twitterBearerToken = await authorizeTwitter()
  console.log('twitterBearerToken', twitterBearerToken)
  req.session.twitterBearerToken = twitterBearerToken

  res.write(webpackMiddleware.fileSystem.readFileSync(index))
  res.end()
})

app.use('/tweets/', proxy('https://api.twitter.com/', {
  decorateRequest: (proxyReq, originalReq) => {
    // AAAAAAAAAAAAAAAAAAAAAMRe0AAAAAAADlqr9nPKMD5Zmv8rlI5sIRfwYw8%3DXgBreJMWxFmsKgtU7dfXnBVXhCfgZR4PDTSvV8Ss62qGrK3KAO
    console.log('Twitter request using token: ', originalReq.session.twitterBearerToken)
    proxyReq.headers['Authorization'] = originalReq.session.twitterBearerToken
  }
}))

app.get('/oauth/twitter/callback', (req, res) => {
  res.write('fuckoffffffffffffffffffffffffffffffffffffff twitter')
  res.end()
})

app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT)
})
