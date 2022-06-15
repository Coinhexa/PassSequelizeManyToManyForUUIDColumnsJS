import request from 'supertest';
import { buildUser, buildRole, createUser, createRole } from './factories';
import { startDatabase } from './utils';
import { User } from 'data/models';
import { app } from 'server/app';
import { server } from 'server/index';

const ENDPOINT = '/user';

describe('User tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await server.close();
  });

  test('/POST - Response with a new created user', async () => {
    const fakeUser = await buildUser({});

    const response = await request(app).post(ENDPOINT).send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await User.findByPk(responseUser.userId);

    expect(user.enabled).toBe(fakeUser.enabled);
  });

  test('/POST - Response with a new created user with many to many related models', async () => {
    const rolesDict = await buildRole({});
    const fakeRoles = await createRole(rolesDict);

    const fakeUser = await buildUser({ roles: [fakeRoles.roleId] });

    const response = await request(app).post(ENDPOINT).send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await User.findByPk(responseUser.userId, { include: ['roles'] });

    expect(user.roles[0].roleId).toBe(fakeRoles.roleId);
    expect(user.roles.length).toBe(1);
  });

  test('/GET - Response with a user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeUser.userId}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.userId).toBe(fakeUser.userId);
    expect(data.enabled).toBe(fakeUser.enabled);
  });
  test('/GET - Response with a user not found', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { userId } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).get(`${ENDPOINT}/${userId}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of users', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allUser = await User.findAll();
    expect(data.length).toBe(allUser.length);
  });
  test('/PUT - Response with an updated user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const anotherFakeUser = await buildUser({});

    const response = await request(app).put(`${ENDPOINT}/${fakeUser.userId}`).send({
      enabled: anotherFakeUser.enabled,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.enabled).toBe(anotherFakeUser.enabled);

    const updatedUser = await User.findByPk(fakeUser.userId);

    expect(updatedUser.enabled).toBe(anotherFakeUser.enabled);
  });

  test('/PUT - User does not exists, user cant be updated', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { userId } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).put(`${ENDPOINT}/${userId}`).send({
      enabled: userDict.enabled,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated user (no updates)', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeUser.userId}`).send({ roles: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeUser.userId}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.userId).toBe(fakeUser.userId);

    const deletedUser = await User.findByPk(fakeUser.userId);
    expect(deletedUser).toBe(null);
  });

  test('/DELETE - User does not exists, user cant be deleted', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { userId } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${userId}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
