import Joi from 'joi'

export const validateDivision = (data) =>{
    const divisionSchema = Joi.object({
         name:Joi.string().required().messages({
            'string.base': 'Division name should be a type of text',
            'string.empty': 'Division name cannot be empty',
            'any.required': 'Division name is required'
         }),
          code:Joi.string().required().messages({
            'string.base': 'Division code should be a type of text',
            'string.empty': 'Division code cannot be empty',
            'any.required': 'Division code is required'
         }),
         
          status:Joi.number()

    })

    const options = { abortEarly: false, allowUnknown: false };
    return divisionSchema.validate(data, options);
}
