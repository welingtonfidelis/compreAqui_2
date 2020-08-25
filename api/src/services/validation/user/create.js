const Joi = require('@hapi/joi');

module.exports = Joi.object({
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
        .required(),

    password: Joi.string()
        // .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(.+){8,30}$'))
        .required(),

    type: Joi.string()
        .min(6)
        .max(10)
        .required(),

    cep: Joi.string()
        .min(8)
        .max(9)
        .required(),

    state: Joi.string()
        .length(2)
        .required(),

    city: Joi.string()
        .min(3)
        .max(30)
        .required(),

    district: Joi.string()
        .min(3)
        .max(40)
        .required(),

    street: Joi.string()
        .min(3)
        .max(30)
        .required(),

    number: Joi.number()
        .integer()
        .min(1)
        .required(),

    complement: Joi.string()
        .min(3)
        .max(20),
});