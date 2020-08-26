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
        name: String
    }
    
    type Size {
        id: ID,
        providerId: ID,
        name: String
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

    #=====================>>  QUERY  <<=====================#

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

        ##===========> USER <============##
        userStore(
            name: String!,
            doc: String!,
            email: String!,
            phone1: String!,
            phone2: String,
            user: String!,
            birth: String!,
            password: String!,
            type: String!,
            cep: String!,
            state: String!,
            city: String!,
            district: String!,
            street: String!,
            complement: String,
            number: Int!
        ): ID

        userUpdate(
            id: ID!,
            name: String!,
            doc: String!,
            email: String!,
            phone1: String!,
            phone2: String,
            user: String!,
            birth: String!
        ): Boolean

        userDelete(
            id: ID!
        ): Boolean

        ##===========> BRAND <============##
        brandStore(
            name: String!,
        ): ID

        brandUpdate(
            id: ID!
            name: String!
        ): Boolean

        brandDelete(
            id: ID!
        ): Boolean

        ##===========> SIZE <============##
        sizeStore(
            name: String!,
        ): ID

        sizeUpdate(
            id: ID!
            name: String!
        ): Boolean

        sizeDelete(
            id: ID!
        ): Boolean

        ##===========> PRODUCT <============##
        productStore(
            BrandId: ID!,
            SizeId: ID!,
            SubcategoryId: ID!,
            name: String!,
            description: String,
            price: Float!,
            stock: Int!,
        ): Product

        productUpdate(
            id: ID!,
            brandId: ID!,
            sizeId: ID!,
            subcategoryId: ID!,
            description: String!,
            price: Float!,
            stock: Int!,
        ): String

        productDelete(
            id: ID!,
        ): String

        ##===========> ORDER <============##
        ordertStore (
            providerId: ID!,
            value: Float!,
            delivery: String!,
            cash: String!,
            cashBack: Float!,
            observation: String,
            products: [OrderListProduct!]
        ): Order

        orderChangeStatus (
            id: ID!,
            status: String,
            timeWait: Int,
            reason: String
        ): String
    }
`;

module.exports = typeDefs;