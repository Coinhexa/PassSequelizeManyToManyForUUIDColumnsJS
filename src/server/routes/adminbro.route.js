import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Role,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['roleId', 'name'],
      },
    },
    {
      resource: sequelize.models.User,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['userId', 'enabled'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
