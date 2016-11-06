
const Strategy = require('passport-strategy').Strategy
const Nextengine = require('next-engine')
const { User } = require('next-engine/Entity')
const Connection = require('next-engine/lib/Connection')

class NextengineStrategy extends Strategy {
  constructor(options, verify) {
    options = options || {}
    options.authorizationURL = options.authorizationURL || path.join(Connection.HOST_PF, 'users', 'sign_in')
    options.tokenURL = options.tokenURL || path.join(Connection.HOST, 'api_neauth')

    super(options, verify)

    this.name = 'nextengine'
  }

  authenticate (req, options) {
    
  }
}

module.exports = NextengineStrategy
