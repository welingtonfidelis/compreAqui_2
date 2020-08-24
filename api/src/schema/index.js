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
        categoryId: ID,
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

    type Brand {
        id: ID,
        providerId: ID,
        brandDescription: String
    }
    
    type Size {
        id: ID,
        providerId: ID,
        sizeDescription: String
    }
    
    type Product {
        id: ID,
        providerId: ID,
        brandId: ID,
        sizeId: ID,
        subcategoryId: ID,
        name: String,
        description: String,
        price: Float,
        stock: Int,
        provider: User,
        brand: Brand,
        size: Size,
        productPhotos: [ProductPhoto]
    }
    
    type ProductPhoto {
        id: ID,
        productId: ID,
        photoUrl: String
    }
    
    type Order {
        id: ID,
        clientId: ID,
        providerId: ID,
        timeWait: Int,
        value: Float,
        status: String,
        delivery: String,
        cashBack: Float,
        cash: String,
        createdAt: String,
        client: User,
        provider: User,
        observation: String,
        reason: String,
        orderProducts: [OrderProducts]
    }
    
    input OrderListProduct {
        id: ID,
        amount: Int
        price: Float
    }
    
    type OrderProducts {
        id: ID,
        orderId: ID,
        productId: ID,
        amount: Int,
        price: Float,
        order: Order,
        product: Product
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
        userShowByDoc(doc: String!): Boolean
        userShowByEmail(email: String!): Boolean
        userShowByUser(user: String!): Boolean

        ##===========> STATES <============##
        stateIndex: [State]

        ##===========> BRANDS <============##
        brandCount: Int
        brandIndex(page: Int): [Brand]
        brandShow(id: ID!): Brand

        ##===========> SIZES <============##
        sizeCount: Int
        sizeIndex(page: Int): [Size]
        sizeShow(id: ID!): Size

        ##===========> CATEGORIES <============##
        categoryIndex: [Category]

        ##===========> SUBCATEGORIES <============##
        subcategoryIndex: [Subcategory]
        subcategoryIndexByUser: [Subcategory]

        ##===========> PRODUCT <============##
        productIndex(providerId: ID, page: Int): [Product]
        productCount(providerId: ID): Int
        productShow(id: ID!): Product
        
        ##===========> ORDER <============##
        orderIndex(page: Int, status: String): [Order]
        orderCount(status: String): Int
    
        ##===========> ORDER/PRODUTO <============##
        orderShow(id: ID!): Order
    }

    # =====================>>  MUTATION  <<=====================#

    type Mutation {
        test(name: String!): String!

        singleUpload(file: String!): String!
    }
`;

module.exports = typeDefs;