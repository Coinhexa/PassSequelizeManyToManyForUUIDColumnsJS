import { Router } from 'express';
import { validate } from 'express-validation';
import { UserController } from 'server/controllers';
import { userValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(userValidation.getAll, options), UserController.getAll);

router.get('/:userId', UserController.get);

router.post('/', validate(userValidation.create, options), UserController.create);

router.put('/:userId', validate(userValidation.update, options), UserController.update);

router.patch(
  '/:userId',
  validate(userValidation.partialUpdate, options),
  UserController.partialUpdate
);

router.delete('/:userId', validate(userValidation.destroy, options), UserController.destroy);

export { router as userRouter };
