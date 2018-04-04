const User = require('./user')

module.exports = (...rest) => new User(rest)

