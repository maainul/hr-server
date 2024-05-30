import Joi from 'joi'

export const validatePromotionsAndIncrement = (data) => {
   const promotionsAndIncrementSchema = Joi.object({
      previous_designation: Joi.string().required().messages({
         'string.base': 'previous designation should be a type of text',
         'string.empty': 'previous designation cannot be empty',
         'any.required': 'previous designation is required'
      }),
      new_designation: Joi.string().required().messages({
         'string.base': 'new designation  should be a type of text',
         'string.empty': 'new designation  cannot be empty',
         'any.required': 'new designation  is required'
      }),
      employee: Joi.string().required().messages({
         'string.base': 'employee code should be a type of text',
         'string.empty': 'employee code cannot be empty',
         'any.required': 'employee code is required'
      }),
      promotion_date: Joi.date().required().messages({
         'date.base': 'promotion date  should be a type of date',
         'date.empty': 'promotion date  cannot be empty',
         'any.required': 'promotion date  is required'
      }),
      remarks: Joi.date().required().messages({
         'string.base': 'remarks should be a type of text',
         'string.empty': 'remarks cannot be empty',
         'any.required': 'remarks is required'
      }),
   })

   const options = { abortEarly: false, allowUnknown: false };
   return promotionsAndIncrementSchema.validate(data, options);
}
