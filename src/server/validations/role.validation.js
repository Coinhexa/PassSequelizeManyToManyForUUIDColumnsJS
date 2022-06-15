import { Joi } from 'express-validation';

const roleValidation = {
  getAll: {
    query: Joi.object({
      roleId: Joi.string().uuid({ version: ['uuidv4'] }),
      name: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      name: Joi.string().max(255),
      users: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  update: {
    params: Joi.object({
      roleId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255).required(),
      users: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      roleId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255),
      users: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      roleId: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
};

export { roleValidation };
