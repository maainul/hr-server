import Joi from 'joi'


export const validateUser = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name can not be empty',
            'any.required': 'Name name is required'
        }),
        password: Joi.string().required().messages({
            'string.base': 'Password code should be a type of text',
            'string.empty': 'Password can not be empty',
            'any.required': 'Password is required'
        }),
        passwordVerify: Joi.string().required().messages({
            'string.base': 'Password Verify be a type of text',
            'string.empty': 'Password Verify not be empty',
            'any.required': 'Password is required'
        })
    })

    const options = { abortEarly: false, allowUnknown: false };
    return userSchema.validate(data, options);
}

