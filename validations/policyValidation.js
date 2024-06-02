import Joi from 'joi'

export const validatePolicy = (data) => {
   const policySchema = Joi.object({
      name: Joi.string().required().messages({
         'string.base': 'Name should be a type of text',
         'string.empty': 'Name cannot be empty',
         'any.required': 'Name is required'
      }),
      benefit: Joi.string().required().messages({
         'string.base': 'benefit should be a type of text',
         'string.empty': 'benefit cannot be empty',
         'any.required': 'benefit is required'
      }),
      value: Joi.string().required().messages({
         'string.base': 'value should be a type of text',
         'string.empty': 'value cannot be empty',
         'any.required': 'value is required'
      }),
      status: Joi.number()

   })

   const options = { abortEarly: false, allowUnknown: false };
   return policySchema.validate(data, options);
}
