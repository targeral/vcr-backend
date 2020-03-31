const { makeExecutableSchema } = require('graphql-tools');
// const typeDefs = require('./schema.graphql');

const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
    link(id: ID!): Link
}
type Mutation {
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
}
type Link {
    id: ID!
    description: String!
    url: String!
}
`;

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
// let links = [];
let idCount = links.length;

const findLinkIndexById = id => {
    for (let i = 0, len = links.length; i < len; i++) {
        let link = links[i];
        if (link.id === id) {
            return i;
        }
    }
    return -1;
}

const resolvers = {
    Query: {
        info: () => {
            console.log('info')
            return 'This is the API of a Hackernews Clone';
        },
        feed: () => {
            console.log('feed', links)
            return links;
        },
        link: (root, args) => {
            let { id } = args;
            return links[findLinkIndexById(id)];
        }
    },
    Mutation: {
        deleteLink: (root, args) => {
            let { id } = args;
            let index = findLinkIndexById(id);
            return index === -1 ? null : links.splice(index, 1);
        },
        updateLink: (root, args) => {
            let { id, ...rest } = args;
            let index = findLinkIndexById(id);
            if (index === -1) {
                return null
            }
            links[index] = Object.assign(links[index], {}, rest);
            return links[index];
        },
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        }
    },
    // Link: {
    //     id: (root) => {
    //         console.log('id', root);
    //         return 'update' + root.id;
    //     },
    //     description: (root) => {
    //         console.log('description');
    //         return 'update' + root.description;
    //     },
    //     url: (root) => {
    //         console.log('url')
    //         return 'update' + root.url;
    //     },
    // }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
