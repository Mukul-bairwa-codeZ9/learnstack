import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(4000),

  FRONTEND_URL: Joi.string().required(),

  MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  JWT_REFRESH_SECRET: Joi.string().required(),

  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('15m'),

  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
});
