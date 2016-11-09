
const fs = require('fs')
const path = require('path')
const co = require('co')
const Koa = require('koa')
const route = require('koa-route')
const render = require('koa-ejs')
const session = require('koa-session')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const passport = require('./passport')

const app = new Koa

app.keys = ['xxx']

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false
})
app.context.render = co.wrap(app.context.render)

app
  .use(bodyParser())
  .use(convert(session(app)))
  .use(passport.initialize())
  .use(passport.session())
  // GET /
  .use(route.get('/', (ctx) =>
    ctx.render('index')
  ))
  // GET /logout
  .use(route.get('/logout', (ctx) => {
    ctx.logout()
    ctx.redirect('/')
  }))
  // POST /auth/nextengine
  .use(route.post('/auth/nextengine',
    passport.authenticate('nextengine')
  ))
  // GET /auth/nextengine/callback
  .use(route.get('/auth/nextengine/callback',
    passport.authenticate('nextengine', {
      failureRedirect: '/',
      successRedirect: '/dashboard'
    })
  ))
  // Require authentication for now
  .use((ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next()
    } else {
      ctx.redirect('/')
    }
  })
  // GET /dashboard
  .use(route.get('/dashboard', (ctx) => {
    return ctx.render('dashboard', { user: ctx.state.user })
  }))

// Launch app server
if (process.env.PORT) {
  app.listen(process.env.PORT)
} else {
  console.error('Environment variable `PORT` must be required')
}
