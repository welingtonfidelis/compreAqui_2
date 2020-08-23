require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const { validateToken } = require('./utils');

const port = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        if (req.headers.authorization) return validateToken(req);
        return {};
    },
});

server.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});