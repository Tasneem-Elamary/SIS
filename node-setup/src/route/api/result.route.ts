import * as express from 'express';
import { resultController } from '../../controller';
import { isAuth, authorizeRoles } from '../../middleware/auth.middleware';

import { validategetStudentCourseResult, validategetStudentResult, validategetStudentSemesterResult } from '../../middleware/validation/resultValidation.middleware';
import { uploadCSV } from '../../middleware/fileUpload';

const router = express.Router();

router.route('/').post(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), uploadCSV, resultController.uploadStudentsResults);
router.route('/').get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), resultController.getAllResults);
router.route('/:id').post(resultController.updateResultById);
router.get('/:studentId', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), validategetStudentResult, resultController.getStudentResult);
router.get('/:studentId/:courseId/:semesterId', validategetStudentCourseResult, isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), resultController.getStudentCourseResult);
router.get('/:studentId/:semesterId', validategetStudentSemesterResult, isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), resultController.getStudentSemesterResult);
router.route('/:id').delete(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), resultController.deleteResult);
export default router;
