import { Router } from 'express';
import { validate } from 'express-validation';
import { RoleController } from 'server/controllers';
import { roleValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(roleValidation.getAll, options), RoleController.getAll);

router.get('/:roleId', RoleController.get);

router.post('/', validate(roleValidation.create, options), RoleController.create);

router.put('/:roleId', validate(roleValidation.update, options), RoleController.update);

router.patch(
  '/:roleId',
  validate(roleValidation.partialUpdate, options),
  RoleController.partialUpdate
);

router.delete('/:roleId', validate(roleValidation.destroy, options), RoleController.destroy);

export { router as roleRouter };
