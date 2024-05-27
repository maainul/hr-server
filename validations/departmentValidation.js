import Joi from 'joi'

export const validateDepartment = (data) =>{
    const departmentSchema = Joi.object({
         name:Joi.string().required(),
         dptCode:Joi.string().required()

    })

    const options = { abortEarly: false, allowUnknown: false };
    return departmentSchema.validate(data, options);
}
