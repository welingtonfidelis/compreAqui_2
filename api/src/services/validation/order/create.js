const Joi = require('@hapi/joi');

const OrderListProduct = Joi.object().keys({
    id: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
    price: Joi.number().required()
});

module.exports = Joi.object({
    providerId: Joi.number()
        .integer()
        .min(1)
        .required(),

    cashBack: Joi.number()
        .required(),

    delivery: Joi.boolean(),

    cash: Joi.boolean(),

    value: Joi.number()
        .required(),

    observation: Joi.string()
        .min(3)
        .max(255)
        .required(),

    description: Joi.string()
        .min(3)
        .max(255),

    products: Joi.array()
        .ordered(OrderListProduct)
});