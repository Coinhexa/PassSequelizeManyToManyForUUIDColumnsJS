import { User } from 'data/models';
import { NotFound } from 'server/utils/errors';

class UserRepository {
  static async create(enabled, roles) {
    const createdUser = await User.create({
      enabled,
    });

    if (roles) await createdUser.setRoles(roles);

    return createdUser;
  }

  static get(userId) {
    return User.findByPk(userId, { include: ['roles'] });
  }

  static getAll(filters) {
    return User.findAll({
      where: filters,
      include: ['roles'],
    });
  }

  static async update(userId, enabled, roles) {
    return this.partialUpdate({
      userId,
      enabled,
      roles,
    });
  }

  static async partialUpdate({ userId, enabled, roles }) {
    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw new NotFound(`User with primary key ${userId} not found`);
    if (enabled !== undefined) foundUser.enabled = enabled;
    if (roles !== undefined) await foundUser.setRoles(roles);
    await foundUser.save();
    return foundUser.reload();
  }

  static async destroy(userId) {
    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw new NotFound(`User with primary key ${userId} not found`);
    await foundUser.destroy();
    return foundUser;
  }
}

export { UserRepository };
