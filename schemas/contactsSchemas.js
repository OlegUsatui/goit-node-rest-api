import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),
    phone: Joi.string().required().messages({
        'any.required': 'Phone is required',
        'string.empty': 'Phone cannot be empty',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().messages({
        'string.empty': 'Name cannot be empty',
    }),
    email: Joi.string().email().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),
    phone: Joi.string().messages({
        'string.empty': 'Phone cannot be empty',
    }),
}).min(1);