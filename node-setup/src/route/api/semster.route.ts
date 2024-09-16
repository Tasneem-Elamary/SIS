import * as express from 'express';
import { semsterController } from '../../controller';
import { isAuth } from '../../middleware/auth.middleware';
import { validateCreateSemester, validateUpdateSemester } from '../../middleware/validation/semsterValidation.middleware';

const router = express.Router();

router.route('/').post(validateCreateSemester, semsterController.createSemester);

router.route('/').get(semsterController.getCurrentSemester);

router.route('/:id').put(validateUpdateSemester, semsterController.updateSemester);

router.route('/:id').delete(semsterController.deleteSemester);

export default router;
