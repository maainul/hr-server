import Joi from 'joi'

export const validateUnit = (data) => {
   const UnitSchema = Joi.object({
      name: Joi.string().required().messages({
         'string.base': 'Unit name should be a type of text',
         'string.empty': 'Unit name cannot be empty',
         'any.required': 'Unit name is required'
      }),
      division: Joi.string().required().messages({
         'string.base': 'Division code should be a type of text',
         'string.empty': 'Division code cannot be empty',
         'any.required': 'Division code is required'
      }),

      status: Joi.number()

   })

   const options = { abortEarly: false, allowUnknown: false };
   return UnitSchema.validate(data, options);
}
