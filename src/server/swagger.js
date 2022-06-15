const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/role/': {
      get: {
        summary: 'Lists all the roles',
        tags: ['role'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Role',
            },
          },
        },
      },
      post: {
        summary: 'Creates a role',
        tags: ['role'],
        parameters: [
          {
            name: 'role',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateRole',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new role',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateRole',
            },
          },
        },
      },
    },
    '/role/{roleId}': {
      get: {
        summary: 'Gets a role by its primary key',
        tags: ['role'],
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a role with primary key',
            schema: {
              $ref: '#/definitions/Role',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a role by its primary key',
        tags: ['role'],
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a role',
        tags: ['role'],
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Role',
            },
          },
          {
            name: 'role',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateRole',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a role',
            schema: {
              $ref: '#/definitions/Role',
            },
          },
        },
      },
      patch: {
        tags: ['role'],
        summary: 'patch a role',
        parameters: [
          {
            name: 'roleId',
            in: 'path',
            schema: {
              $ref: '#/definitions/Role',
            },
          },
          {
            name: 'role',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateRole',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a role and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Role',
            },
          },
        },
      },
    },

    '/user/': {
      get: {
        summary: 'Lists all the users',
        tags: ['user'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      post: {
        summary: 'Creates a user',
        tags: ['user'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new user',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        },
      },
    },
    '/user/{userId}': {
      get: {
        summary: 'Gets a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a user with primary key',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a user',
        tags: ['user'],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      patch: {
        tags: ['user'],
        summary: 'patch a user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user and its partially overwritten values',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
  },
  definitions: {
    Role: {
      required: [],
      properties: {
        roleId: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 255,
        },
        users: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    User: {
      required: [],
      properties: {
        userId: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        enabled: {
          type: 'boolean',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateRole: {
      required: [],
      properties: {
        roleId: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 255,
        },
        users: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    CreateUpdateUser: {
      required: [],
      properties: {
        userId: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        enabled: {
          type: 'boolean',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },
  },
};

export { swaggerDocument };
