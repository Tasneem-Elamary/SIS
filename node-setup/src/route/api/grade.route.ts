import * as express from 'express';
import { facultyAdminContoller, gradeController } from '../../controller';
import { isAuth } from '../../middleware/auth.middleware';
import { validateCreateGrade, validateUpdateGrade, validateGradeId } from '../../middleware/validation/gradeValidation.middleware';

const router = express.Router();

router.route('/').post(validateCreateGrade, gradeController.createGrade);

router.route('/Bylaw/:BylawId').get(gradeController.getAllGradesBylawId);

router.route('/:id').put(validateUpdateGrade, gradeController.updateGrade);

router.route('/:id').delete(validateGradeId, gradeController.deleteGrade);

export default router;
