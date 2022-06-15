import { CREATED } from 'http-status';
import { RoleService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class RoleController {
  static async create(req, res, next) {
    try {
      const { name, users } = req.body;
      const newRole = await RoleService.create(name, users);
      res.locals.status = CREATED;
      res.locals.data = newRole;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { roleId } = req.params;
      const roleObject = await RoleService.get(roleId);
      if (!roleObject) {
        throw new NotFound(`Role with primary key ${roleId} not found`);
      }
      res.locals.data = roleObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allRoles = await RoleService.getAll(filters);
      res.locals.data = allRoles;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { roleId } = req.params;
      const { name, users } = req.body;

      const updatedRole = await RoleService.update(roleId, name, users);

      res.locals.data = updatedRole;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { roleId } = req.params;
      const { name, users } = req.body;

      const updatedRole = await RoleService.partialUpdate(roleId, name, users);

      res.locals.data = updatedRole;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { roleId } = req.params;
      const roleDelete = await RoleService.destroy(roleId);
      res.locals.data = roleDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { RoleController };
