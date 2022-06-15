import request from 'supertest';
import { buildRole, buildUser, createRole, createUser } from './factories';
import { startDatabase } from './utils';
import { Role } from 'data/models';
import { app } from 'server/app';
import { server } from 'server/index';

const ENDPOINT = '/role';

describe('Role tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await server.close();
  });

  test('/POST - Response with a new created role', async () => {
    const fakeRole = await buildRole({});

    const response = await request(app).post(ENDPOINT).send(fakeRole);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseRole = response.body.data;

    const role = await Role.findByPk(responseRole.roleId);

    expect(role.name).toBe(fakeRole.name);
  });

  test('/POST - Response with a new created role with many to many related models', async () => {
    const usersDict = await buildUser({});
    const fakeUsers = await createUser(usersDict);

    const fakeRole = await buildRole({ users: [fakeUsers.userId] });

    const response = await request(app).post(ENDPOINT).send(fakeRole);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseRole = response.body.data;

    const role = await Role.findByPk(responseRole.roleId, { include: ['users'] });

    expect(role.users[0].userId).toBe(fakeUsers.userId);
    expect(role.users.length).toBe(1);
  });

  test('/GET - Response with a role', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeRole.roleId}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.roleId).toBe(fakeRole.roleId);
    expect(data.name).toBe(fakeRole.name);
  });
  test('/GET - Response with a role not found', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);
    const { roleId } = fakeRole;
    await fakeRole.destroy();

    const response = await request(app).get(`${ENDPOINT}/${roleId}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of roles', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allRole = await Role.findAll();
    expect(data.length).toBe(allRole.length);
  });
  test('/PUT - Response with an updated role', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);

    const anotherFakeRole = await buildRole({});

    const response = await request(app).put(`${ENDPOINT}/${fakeRole.roleId}`).send({
      name: anotherFakeRole.name,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeRole.name);

    const updatedRole = await Role.findByPk(fakeRole.roleId);

    expect(updatedRole.name).toBe(anotherFakeRole.name);
  });

  test('/PUT - Role does not exists, role cant be updated', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);
    const { roleId } = fakeRole;
    await fakeRole.destroy();

    const response = await request(app).put(`${ENDPOINT}/${roleId}`).send({
      name: roleDict.name,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated role (no updates)', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeRole.roleId}`).send({ users: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted role', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeRole.roleId}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.roleId).toBe(fakeRole.roleId);

    const deletedRole = await Role.findByPk(fakeRole.roleId);
    expect(deletedRole).toBe(null);
  });

  test('/DELETE - Role does not exists, role cant be deleted', async () => {
    const roleDict = await buildRole({});
    const fakeRole = await createRole(roleDict);
    const { roleId } = fakeRole;
    await fakeRole.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${roleId}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
