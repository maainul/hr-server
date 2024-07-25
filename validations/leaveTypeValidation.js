import Joi from 'joi'

export const validateLeaveType = (data) => {
   const leaveTypeSchema = Joi.object({
      name: Joi.string().required().messages({
         'string.base': 'LeaveType name should be a type of text',
         'string.empty': 'LeaveType name cannot be empty',
         'any.required': 'LeaveType name is required'
      }),
      description: Joi.string().optional().messages({
         'string.base': 'LeaveType code should be a type of text',
      }),

      leave_limit: Joi.number().required().messages({
         'number.base': 'leave limit should be a type of number',
         'any.required': 'leave limit is requiured',
      }),

   })

   const options = { abortEarly: false, allowUnknown: false };
   return leaveTypeSchema.validate(data, options);
}
