const users = require('../../database').user

module.exports = {
    Query: {
        users: () => users.value()
    }
}