const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    name: Joi.string()
        .min(3)
        .max(255)
        .required(),

    doc: Joi.string()
        .min(11)
        .max(18)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),

    phone1: Joi.string()
        .min(8)
        .max(16)
        .required(),

    phone2: Joi.string()
        .min(8)
        .max(16),

    user: Joi.string()
        .min(3)
        .max(20)
        .required(),

    birth: Joi.string()
        .length(10)
        .required()
});