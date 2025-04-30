import Joi from "joi";

export const validateStockTransactionType = (data) => {
  const StockTransactionTypeSchema = Joi.object({
    longDescription: Joi.string().required().messages({
      "string.base": "longDescription should be a type of text",
      "string.empty": "longDescription cannot be empty",
      "any.required": "longDescription is required",
    }),
    shortDescription: Joi.string().required().messages({
      "string.base": "shortDescriptionshould be a type of text",
      "string.empty": "shortDescription cannot be empty",
      "any.required": "shortDescription is required",
    }),
    code: Joi.string().required().messages({
      "string.base": " code should be a type of text",
      "string.empty": " code cannot be empty",
      "any.required": " code is required",
    }),
    policy: Joi.string().required().messages({
      "string.base": "policy code should be a type of text",
      "string.empty": "policy code cannot be empty",
      "any.required": "policy code is required",
    }),
    increaseDecreaseFlag: Joi.string().required().messages({
      "string.base": "increaseDecreaseFlag code should be a type of text",
      "string.empty": "increaseDecreaseFlag code cannot be empty",
      "any.required": "increaseDecreaseFlag code is required",
    }),
    status: Joi.number(),
  });

  const options = { abortEarly: false, allowUnknown: false };
  return StockTransactionTypeSchema.validate(data, options);
};
