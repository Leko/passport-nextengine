
# passport-nextengine demo application

## Getting started

```
git clone 
cd passport-nextengine/examples
docker-compose build
docker-compose up
```

Then if you use docker-machine, Run `$ open https://$(docker-machine):8888`.  
Or if you use Docker for Mac, open `https://localhost:8888`

## Register strategy

See passport.js

## Authenticate

```js
app
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
```

See index.js
