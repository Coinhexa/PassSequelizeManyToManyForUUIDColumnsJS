import { UserRepository } from 'data/repositories';

class UserService {
  static create(enabled, roles) {
    return UserRepository.create(enabled, roles);
  }

  static get(userId) {
    return UserRepository.get(userId);
  }

  static getAll(args) {
    return UserRepository.getAll(args);
  }

  static update(userId, enabled, roles) {
    return UserRepository.update(userId, enabled, roles);
  }

  static partialUpdate(userId, enabled, roles) {
    return UserRepository.partialUpdate({ userId, enabled, roles });
  }

  static destroy(userId) {
    return UserRepository.destroy(userId);
  }
}

export { UserService };
