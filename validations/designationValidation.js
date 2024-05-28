import Joi from 'joi'

export const validateDesignation = (data) =>{
    const designationSchema = Joi.object({
         name:Joi.string().required().messages({
            'string.base': 'Designation name should be a type of text',
            'string.empty': 'Designation name cannot be empty',
            'any.required': 'Designation name is required'
         }),
          status:Joi.number()

    })

    const options = { abortEarly: false, allowUnknown: false };
    return designationSchema.validate(data, options);
}
