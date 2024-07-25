import Joi from 'joi'

export const validateEmployeeLeave = (data) => {
   const employeeLeaveSchema = Joi.object({
      employee: Joi.string().required().messages({
         'string.base': 'Employee ID should be a type of text',
         'string.empty': 'Employee ID cannot be empty',
         'any.required': 'Employee ID is required'
      }),
      leaveType: Joi.string().required().messages({
         'string.base': 'Leave type ID should be a type of text',
         'string.empty': 'Leave type ID code cannot be empty',
         'any.required': 'Leave type ID code is required'
      }),
      numberOfDays: Joi.number().required().messages({
         'number.base': 'Days should be a type of number',
         'any.required': 'Days is requiured',
      }),

      start_date: Joi.date().optional().messages({
         'string.base': 'start date should be a type of date',
         'date.empty': 'Start date cannot be empty',
         'any.required': 'Birth date code is required'
      }),
      end_date: Joi.date().optional().messages({
         'string.base': 'start date should be a type of date',
         'date.empty': 'Start date cannot be empty',
         'any.required': 'Birth date code is required'
      }),
      superVisiorStatus: Joi.number().optional().messages({
         'string.base': 'dptHeadStatus should be a type of number',
      }),
      dptHeadStatus: Joi.number().optional().messages({
         'string.base': 'dptHeadStatus Name should be a type of number',
      }),
      HRStatus: Joi.number().optional().messages({
         'string.base': 'dptHeadStatus should be a type of number',
      }),
   })

   const options = { abortEarly: false, allowUnknown: false };
   return employeeLeaveSchema.validate(data, options);
}
