import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  port: Joi.number().integer().default(8080),
  mongodb: Joi.string().required(),
  jwtsecret: Joi.string().required(),
  news: Joi.string().required(),
  newskey: Joi.string().required(),
});
