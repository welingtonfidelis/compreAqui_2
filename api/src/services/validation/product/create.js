const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),

    description: Joi.string()
        .min(3)
        .max(255),

    price: Joi.number()
        .required(),

    brandId: Joi.number()
        .integer()
        .min(1)
        .required(),

    sizeId: Joi.number()
        .integer()
        .min(1)
        .required(),

    subcategoryId: Joi.number()
        .integer()
        .min(1)
        .required(),

    stock: Joi.number()
        .integer()
        .min(1)
        .required()
});