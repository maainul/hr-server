import Joi from 'joi'

export const validateEmployeeLeaveBalance = (data) => {
   const employeeLeaveBalanceSchema = Joi.object({
      employee: Joi.string().required().messages({
         'string.base': 'Employee ID should be a type of text',
         'string.empty': 'Employee ID cannot be empty',
         'any.required': 'Employee ID is required'
      }),
      leaveType: Joi.string().required().messages({
         'string.base': 'leaveType ID should be a type of text',
         'string.empty': 'leaveType ID code cannot be empty',
         'any.required': 'leaveType ID code is required'
      }),
      totalLeave: Joi.number().required().messages({
         'number.base': 'totalLeave should be a type of number',
         'any.required': 'totalLeave is requiured',
      }),
      totalLeaveTaken: Joi.number().optional().messages({
         'number.base': 'totalLeave should be a type of number',
      }),
      leaveBalance: Joi.number().optional().messages({
         'number.base': 'leaveBalance should be a type of number',
      }),
      leavePending: Joi.number().optional().messages({
         'number.base': 'leavePending should be a type of number',
      }),
   })

   const options = { abortEarly: false, allowUnknown: false };
   return employeeLeaveBalanceSchema.validate(data, options);
}
