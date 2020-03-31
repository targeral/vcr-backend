const { graphiqlKoa, graphqlKoa } = require('apollo-server-koa');
const schema = require('./graphql');

module.exports = (router, server) => {
    router.post('graphql', graphqlKoa({ schema }));
    router.get('graphql', graphqlKoa({ schema }));
    router.get(
        'graphiql', 
        graphiqlKoa({
            endpointURL: 'graphql'
        })
    );
    return router;
}
