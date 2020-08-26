const Upload = require('../services/Upload');
const { errorResponse, createError, isAuthenticated } = require('../utils');
const { Op } = require('sequelize');
const {
    User, Category, Address, State, Brand, Size, Subcategory,
    Product, ProductPhoto, Order, OrderProduct
} = require('../models');
const SessionController = require('../controllers/SessionController');
const StateController = require('../controllers/StateController');
const UserController = require('../controllers/UserController');
const BrandController = require('../controllers/BrandController');
const SizeController = require('../controllers/SizeController');
const CategoryController = require('../controllers/CategoryController');
const SubcategoryController = require('../controllers/SubcategoryController');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');

const resolvers = {
    // =====================>>  QUERY  <<=====================//

    Query: {
        //===========> TESTS <============//
        test: () => {
            return 'Hello World!';
        },

        //===========> LOGIN/SESSION <============//
        sessionSign: async (_, args) => {
            return await SessionController.login(args);
        },

        //===========> STATES <============//
        stateIndex: async (_, args) => {
            return await StateController.index(args);
        },

        //===========> USERS <============//
        userIndex: async (_, args, context) => {
            return await UserController.index(args, context);
        },
        userIndexByCategory: async (_, args, context) => {
            return await UserController.indexByCategory(args, context);
        },
        userShow: async (_, args, context) => {
            return await UserController.show(args, context);
        },

        userShowByDoc: async (_, args) => {
            return await UserController.showByDoc(args);
        },
        userShowByEmail: async (_, args) => {
            return await UserController.showByEmail(args);
        },
        userShowByUser: async (_, args) => {
            return await UserController.showByUser(args);
        },

        //===========> BRANDS <============//
        brandCount: async (_, args, context) => {
            return await BrandController.count(args, context);
        },
        brandIndex: async (_, args, context) => {
            return await BrandController.index(args, context);
        },
        brandShow: async (_, args, context) => {
            return await BrandController.show(args, context);
        },

        //===========> SIZES <============//
        sizeCount: async (_, args, context) => {
            return await SizeController.count(args, context);
        },
        sizeIndex: async (_, args, context) => {
            return await SizeController.index(args, context);
        },
        sizeShow: async (_, args, context) => {
            return await SizeController.show(args, context);
        },

        //===========> CATEGORIES <============//
        categoryIndex: async () => {
            return await CategoryController.index();
        },

        //===========> SUBCATEGORIES <============//
        subcategoryIndex: async () => {
            return await SubcategoryController.index();
        },
        subcategoryIndexByUser: async (_, args, context) => {
            return await SubcategoryController.indexByUser(args, context);
        },

        //===========> PRODUCT <============//
        productCount: async (_, args, context) => {
            return await ProductController.count(args, context);
        },
        productIndex: async (_, args, context) => {
            return await ProductController.index(args, context);
        },
        productShow: async (_, args, context) => {
            return await ProductController.show(args, context);
        },

        //===========> ORDERS <============//
        orderCount: async (_, args, context) => {
            return await OrderController.count(args, context);
        },
        orderIndex: async (_, args, context) => {
            return await OrderController.index(args, context);
        },
        orderShow: async (_, args, context) => {
            return await OrderController.show(args, context);
        },
    },

    // =====================>>  MUTATION  <<=====================//

    Mutation: {
        test: (parent, args) => {
            return 'Olá ' + args.name;
        },

        singleUpload: async (parent, args) => {
            const resp = await Upload.uploadImage(args.file, 'Teste', 'testeUp');

            console.log(resp);
            return 'resp'
        },

        //===========> USERS <============//
        userStore: async (_, args) => {
            return await UserController.store(args);
        },
        userUpdate: async (_, args, context) => {
            return await UserController.update(args, context);
        },
        userDelete: async (_, args, context) => {
            return await UserController.delete(args, context);
        },

        //===========> BRANDS <============//
        brandStore: async (_, args, context) => {
            return await BrandController.store(args, context);
        },
        brandUpdate: async (_, args, context) => {
            return await BrandController.update(args, context);
        },
        brandDelete: async (_, args, context) => {
            return await BrandController.delete(args, context);
        },
    },
};

module.exports = resolvers;