import { Role } from 'data/models';
import { NotFound } from 'server/utils/errors';

class RoleRepository {
  static async create(name, users) {
    const createdRole = await Role.create({
      name,
    });

    if (users) await createdRole.setUsers(users);

    return createdRole;
  }

  static get(roleId) {
    return Role.findByPk(roleId, { include: ['users'] });
  }

  static getAll(filters) {
    return Role.findAll({
      where: filters,
      include: ['users'],
    });
  }

  static async update(roleId, name, users) {
    return this.partialUpdate({
      roleId,
      name,
      users,
    });
  }

  static async partialUpdate({ roleId, name, users }) {
    const foundRole = await Role.findByPk(roleId);
    if (!foundRole) throw new NotFound(`Role with primary key ${roleId} not found`);
    if (name !== undefined) foundRole.name = name;
    if (users !== undefined) await foundRole.setUsers(users);
    await foundRole.save();
    return foundRole.reload();
  }

  static async destroy(roleId) {
    const foundRole = await Role.findByPk(roleId);
    if (!foundRole) throw new NotFound(`Role with primary key ${roleId} not found`);
    await foundRole.destroy();
    return foundRole;
  }
}

export { RoleRepository };
