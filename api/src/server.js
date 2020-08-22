require('dotenv').config();
const resolvers = require('./resolvers');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const port = 3001;

// const autheticate = (token) => {
//     return jwt.verify(token, process.env.SECRET, function (err, decoded) {
//         if (err) { return }

//         return {
//             UserId: decoded.id,
//             typeUser: decoded.typeUser
//         }
//     });
// };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req, res }) => {
    //     const token = req.headers.authorization || '';

    //     if (token) return autheticate(token);

    //     return {};
    // },
});

server.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});