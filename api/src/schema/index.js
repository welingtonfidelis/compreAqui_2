const { gql } = require('apollo-server');

const typeDefs = gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type token {
        name: String,
        token: String,
        typeUser: String,
        typeUserEncript: String,
        photoUrl: String
    }

    type State {
        id: ID,
        description: String,
        code: String
    }


    #========// QUERY //========#

    type Query {
        ##===> Tests <===##
        test: String!
        
        ##===> Login/Session <===##
        sessionSign(user: String!, password: String!, playId: String): token

        ##===> States <===##
        stateIndex: [State]

    }

    #========// MUTATION //========#

    type Mutation {
        test(name: String!): String!

        singleUpload(file: String!): String!
    }
`;

module.exports = typeDefs;