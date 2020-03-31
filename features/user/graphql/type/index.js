const User = `
    type User {
        username: String,
        password: String,
        createDater: String
    }
`;

const Query = `
    type Query {
        users: [User]
    }
`;

const merge = (...rest) => {
    return rest.join('');
}

module.exports = merge(User, Query);
