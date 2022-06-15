import { Joi } from 'express-validation';

const userValidation = {
  getAll: {
    query: Joi.object({
      userId: Joi.string().uuid({ version: ['uuidv4'] }),
      enabled: Joi.boolean(),
    }),
  },
  create: {
    body: Joi.object({
      enabled: Joi.boolean(),
      roles: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  update: {
    params: Joi.object({
      userId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      enabled: Joi.boolean().required(),
      roles: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      userId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      enabled: Joi.boolean(),
      roles: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      userId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
};

export { userValidation };
