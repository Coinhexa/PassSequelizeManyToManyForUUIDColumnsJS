import { faker } from '@faker-js/faker';
import { Role } from 'data/models';
const { random } = faker;

const buildRole = async (roleFks) => {
  const resRole = {};

  resRole.name = random.word().slice(0, 255);

  if (roleFks.users !== null || typeof roleFks.users !== 'undefined') {
    resRole.users = roleFks.users;
  }

  return resRole;
};

const createRole = async (fakeRole) => {
  const role = await Role.create(fakeRole);
  return role;
};

export { buildRole, createRole };
