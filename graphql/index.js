const { graphiqlKoa, graphqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: {
        name: 'J.K. Rowling',
        age: 12
    },
  },
  {
    title: 'Jurassic Park',
    author: {
        name: 'Michael Crichton',
        age: 13
    },
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: Author }
  type Author { name: String, age: Int }
`;

const resolvers = {
    Query: { books: () => books },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = (router) => {
    console.log(schema)
    router.post("/graphql", graphqlKoa({ schema }));
    router.get('/graphql', graphqlKoa({ schema }));
    router.get(
        '/graphiql', 
        graphiqlKoa({
            endpointURL: '/graphql'
        })
    );
}
