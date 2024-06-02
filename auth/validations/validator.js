import Joi from "joi";


export const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
