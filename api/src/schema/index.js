const { gql } = require('apollo-server');

const typeDefs = gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Token {
        name: String,
        token: String,
        typeUser: String,
        typeUserEncript: String,
        photoUrl: String
    }

    type Category {
        id: ID,
        name: String,
        photoUrl: String
    }
    
    type Subcategory {
        id: ID,
        CategoryId: ID,
        name: String,
        photoUrl: String
    }

    type Address {
        id: ID,
        cep: String,
        state: String,
        city: String,
        district: String,
        street: String,
        complement: String,
        number: Int
    }

    type User {
        id: ID,
        name: String,
        doc: String,
        email: String,
        phone1: String,
        phone2: String,
        user: String,
        birth: String,
        photoUrl: String,
        tokenReset: String,
        type: String,
        address: [Address],
        category: Category,
        subcategory: Subcategory,
        playId: String
    }

    type State {
        id: ID,
        description: String,
        code: String
    }


    # =====================>>  QUERY  <<=====================#

    type Query {
        ##===========> TESTS <============##
        test: String!
        
        ##===========> LOGIN/SESSION <============##
        sessionSign(user: String!, password: String!, playId: String): Token

        ##===========> USERS <============##
        userIndex(page: Int): [User]
        userIndexByCategory(page: Int, categoryId: ID!): [User]
        userShow(id: ID!): User
        userShowByDoc(doc: String!): User
        userShowByEmail(email: String!): User
        userShowByUser(user: String!): User

        ##===========> STATES <============##
        stateIndex: [State]

    }

    # =====================>>  MUTATION  <<=====================#

    type Mutation {
        test(name: String!): String!

        singleUpload(file: String!): String!
    }
`;

module.exports = typeDefs;