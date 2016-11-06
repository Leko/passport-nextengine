
const fs = require('fs')
const path = require('path')
const co = require('co')
const Koa = require('koa')
const route = require('koa-route')
const render = require('koa-ejs')
const session = require('koa-session')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')

const app = new Koa

app.keys = ['xxx']

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false
})
app.context.render = co.wrap(app.context.render)

app
  .use(bodyParser())
  .use(convert(session()))
  .use(passport.initialize())
  .use(passport.session())
  .use(route.get('/', (ctx) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('views/index.html')
  }))
  .use(route.get('/', (ctx) =>
    ctx.render('index')
  ))
  .use(route.get('/logout', (ctx) => {
    ctx.logout()
    ctx.redirect('/')
  }))
  .use(route.post('/auth/nextengine', passport.authenticate('nextengine')))
  .use(route.get('/auth/nextengine/callback',
    passport.authenticate('nextengine', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
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
  .use(route.get('/dashboard', (ctx) =>
    ctx.render('dashboard', { user: ctx.user })
  ))

// Launch app server
if (process.env.PORT) {
  app.listen(process.env.PORT)
  console.log('Server listening on', process.env.PORT)
} else {
  console.error('Environment variable `PORT` must be required')
}
