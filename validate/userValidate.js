import Joi from '@hapi/joi';

const userSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': `username should be a type of 'text'`,
        'string.empty': `username cannot be an empty field`,
        'any.required': `username is a required field`,
    }),
    role: Joi.string().required().messages({
        'string.base': `role should be a type of 'text'`,
        'string.empty': `role cannot be an empty field`,
        'any.required': `role is a required field`,
    }),
    email_id: Joi.string().email().required().messages({
        'string.base': `Email should be a type of 'text'`,
        'string.email': `Email should be a valid email address`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': `Password should be a type of 'text'`,
        'string.min': `Password length must be at least 8 characters`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
    }),
});

export default userSchema;