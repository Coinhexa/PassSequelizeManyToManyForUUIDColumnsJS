import { RoleRepository } from 'data/repositories';

class RoleService {
  static create(name, users) {
    return RoleRepository.create(name, users);
  }

  static get(roleId) {
    return RoleRepository.get(roleId);
  }

  static getAll(args) {
    return RoleRepository.getAll(args);
  }

  static update(roleId, name, users) {
    return RoleRepository.update(roleId, name, users);
  }

  static partialUpdate(roleId, name, users) {
    return RoleRepository.partialUpdate({ roleId, name, users });
  }

  static destroy(roleId) {
    return RoleRepository.destroy(roleId);
  }
}

export { RoleService };
